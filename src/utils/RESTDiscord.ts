import { Routes } from 'discord-api-types/rest/v10';

import Bot from '../Bot';
import Command from '../handlers/commands/shared/Command';
import Logger from './Logger';

class RESTDiscord {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  public async clearCommands() {
    const guilds = await this.bot.guilds.fetch();
    for (const guildOAuth of guilds.values()) {
      const guild = await this.bot.guilds.fetch(guildOAuth.id);
      const commands = await guild.commands.fetch();
      for (const command of commands.values()) {
        await command.delete();
      }
    }
  }

  public async clearApplicationCommands() {
    const application = this.bot.application;
    if (!application) return;
    await application.commands.fetch().then(async (commands) => {
      for (const command of commands.values()) {
        await command.delete();
      }
    });
  }

  public async registerGuildSlashCommands(commands: { [key: string]: Command }, guild: string): Promise<void> {
    const slashCommands = Object.values(commands).map((command) => command.getJSON());
    if (!this.bot.application) return;
    await this.bot
      .getRestClient()
      .put(Routes.applicationGuildCommands(this.bot.application.id, guild), { body: slashCommands })
      .catch(Logger.getInstance().error);
  }

  public async registerApplicationSlashCommands(commands: { [key: string]: Command }): Promise<void> {
    const slashCommands = Object.values(commands).map((command) => command.getJSON());
    if (!this.bot.application) return;
    await this.bot
      .getRestClient()
      .put(Routes.applicationCommands(this.bot.application.id), { body: slashCommands })
      .catch(Logger.getInstance().error);
  }
}

export default RESTDiscord;
