import { CommandInteraction } from 'discord.js';

import type { handler } from '../../../../types/handler';
import Command from './Command';

export default class SimpleCommand extends Command {
  handler: handler | null = null;

  constructor(commandName: string, description: string) {
    super(commandName, description);
  }

  addHandler(handler: handler): void {
    this.handler = handler;
  }

  async handleInteraction(interaction: CommandInteraction) {
    if (this.handler) {
      await this.handler(interaction);
    } else {
      await this.replyNotImplemented(interaction);
    }
    return;
  }
}
