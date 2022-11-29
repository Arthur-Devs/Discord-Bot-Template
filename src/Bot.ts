import { REST } from '@discordjs/rest';
import { Client, ClientEvents, IntentsBitField, TextChannel } from 'discord.js';

import handlerManager from './handlers/HandlerManager';
import Event from './libs/Event';
import ListingChannel from './managers/channels/ListingChannel';
import Logger from './utils/Logger';
import RESTDiscord from './utils/RESTDiscord';

export default class Bot extends Client {
  private static instance: Bot;

  private tokenBot: string;
  private logger: Logger = Logger.getInstance();
  private restClient: REST;

  private restDiscord: RESTDiscord = new RESTDiscord(this);

  private listinChannel: ListingChannel | null = null;

  constructor(token: string) {
    super({
      intents: [
        IntentsBitField.Flags.AutoModerationConfiguration,
        IntentsBitField.Flags.AutoModerationExecution,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.DirectMessageTyping,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildBans,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildIntegrations,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildScheduledEvents,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildWebhooks,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent
      ]
    });
    Bot.instance = this;
    this.tokenBot = token;
    this.restClient = new REST().setToken(this.tokenBot);
  }

  public static getInstance(): Bot {
    if (!Bot.instance) {
      throw new Error('Bot not initialized');
    }
    return Bot.instance;
  }

  public getRestClient(): REST {
    return this.restClient;
  }

  public getTokenBot(): string {
    return this.tokenBot;
  }

  async start(): Promise<void> {
    await handlerManager.load();
    await this.registerEvents(handlerManager.getEvents());

    await this.login(this.tokenBot);
    await this.registerAllCommands();
    this.logger.info('Bot started', true);

    const listingChannel = await this.channels.fetch('989073576923652116');
    if (listingChannel?.isTextBased() && this.listinChannel === null) {
      this.listinChannel = new ListingChannel(listingChannel as TextChannel);
    }
  }

  registerAllCommands = async () => {
    await this.restDiscord.clearApplicationCommands();
    this.restDiscord.clearCommands();
    await this.restDiscord.registerGuildSlashCommands(handlerManager.getAllCommands(), '887831977175154698');
  };

  registerEvents = async (events: Event<keyof ClientEvents>[]) => {
    for (const event of events) {
      this.on(event.eventName, (...args) => event.eventRun(...args));
    }
  };
}
