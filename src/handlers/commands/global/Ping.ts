import { CommandInteraction } from 'discord.js';

import { fromNow } from '../../../utils/Utils';
import SimpleCommand from '../shared/SimpleCommand';

class Ping extends SimpleCommand {
  constructor() {
    super('ping', 'Simple Ping command.');
    this.addHandler(this.reply);
  }

  async reply(interaction: CommandInteraction) {
    await interaction.reply(`Pong \n Time to responds : ${fromNow(new Date(interaction.createdAt))}`);
  }
}

export default new Ping();
