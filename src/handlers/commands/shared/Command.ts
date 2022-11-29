import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';

export default abstract class Command {
  protected command: SlashCommandBuilder;
  name: string;

  constructor(command: string, description: string) {
    this.name = command;
    this.command = new SlashCommandBuilder().setName(command).setDescription(description);
  }

  abstract handleInteraction(interaction: CommandInteraction): void;

  protected async replyNotImplemented(interaction: CommandInteraction): Promise<void> {
    await interaction.reply('This command is not implemented yet.');
  }

  getJSON(): RESTPostAPIApplicationCommandsJSONBody {
    return this.command.toJSON();
  }
}
