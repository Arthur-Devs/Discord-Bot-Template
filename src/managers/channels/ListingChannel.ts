import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
import { ButtonInteraction, GuildMember, Message, TextChannel } from 'discord.js';

import Bot from '../../Bot';
import ProposalButton from '../../handlers/buttons/ProposalButton';

export default class ListingChannel {
  private TextChannel: TextChannel;

  private embedBuilder = new EmbedBuilder().setColor([44, 200, 76]);

  constructor(TextChannel: TextChannel) {
    this.TextChannel = TextChannel;
    const bot = Bot.getInstance();
    if (bot.user) {
      this.embedBuilder.setFooter({ text: bot.user?.username, iconURL: bot.user.displayAvatarURL() });
    }

    ProposalButton.getObservable().subscribe(async (interaction: ButtonInteraction) => {
      console.log('subscribe');
      this.sendMessage('test', interaction.member as GuildMember);
    });

    TextChannel.messages.fetch({ limit: 1 }).then(async (messages) => {
      const message = messages.first();
      if (message) {
        const components = message.components;
        if (components) {
          await this.removeOldButtonMessage();
        }
      }
      await this.sendButtonMessage();
    });
  }

  private async sendEmbed(): Promise<Message> {
    const embed = this.embedBuilder.toJSON();
    return await this.TextChannel.send({ embeds: [embed] });
  }

  private async addReactions(message: Message): Promise<void> {
    await message.react('👍');
    await message.react('👎');
  }

  private async openThread(message: Message, name: string): Promise<void> {
    await message.startThread({ name });
  }

  public async sendMessage(proposal: string, user: GuildMember): Promise<void> {
    //remove the old message with the button
    await this.removeOldButtonMessage();

    this.embedBuilder.setTitle(`Suggestion de ${user.displayName}`);
    this.embedBuilder.setDescription(proposal);
    this.embedBuilder.setThumbnail(user.user.displayAvatarURL());
    this.embedBuilder.setTimestamp(Date.now());
    const message = await this.sendEmbed();
    await this.addReactions(message);
    await this.openThread(message, `Proposition de ${user.displayName}`);

    //send a new message with the button
    await this.sendButtonMessage();
  }

  private async removeOldButtonMessage(): Promise<void> {
    const messages = await this.TextChannel.messages.fetch({ limit: 1 });
    const message = messages.first();
    if (message) {
      await message.delete();
    }
  }
  // function to send a message with a button
  public async sendButtonMessage(): Promise<void> {
    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(ProposalButton.getButton());
    //create a message with the button
    console.log('sendButtonMessage');
    try {
      await this.TextChannel.send({ components: [actionRow.toJSON()] });
    } catch (e) {
      console.log(e);
    }
    console.log('sendButtonMessage2');
  }
}
