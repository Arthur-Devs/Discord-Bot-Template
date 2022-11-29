import { SlashCommandSubcommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, CommandInteractionOptionResolver } from 'discord.js';

import type { handler } from '../../../../types/handler';
import Command from './Command';

export default class CommandWithSubsCommands extends Command {
  subsCommands: { [name: string]: handler } = {};

  constructor(commandName: string, description: string) {
    super(commandName, description);
  }

  addSubCommand(handler: handler, subCommand: SlashCommandSubcommandBuilder) {
    this.subsCommands[subCommand.name] = handler;
    this.command.addSubcommand(subCommand);
  }

  async handleInteraction(interaction: CommandInteraction<CacheType>): Promise<void> {
    const subCommandOption = interaction.options as CommandInteractionOptionResolver;
    const subCommandName = subCommandOption.getSubcommand();

    const handler = this.subsCommands[subCommandName];
    if (handler) {
      await handler(interaction);
    } else {
      await this.replyNotImplemented(interaction);
    }
  }
}
