import { HandlerManager } from '../../HandlerManager';
import Command from './Command';

class CommandManager extends HandlerManager {
  private guildsCommands: { [key: string]: Command } = {};
  private globalCommands: { [key: string]: Command } = {};

  public getGuildsCommands(): { [key: string]: Command } {
    return this.guildsCommands;
  }

  public getGlobalCommands(): { [key: string]: Command } {
    return this.globalCommands;
  }

  public async load(): Promise<void> {
    await this.loadGuildCommands();
    await this.loadGlobalCommands();
  }

  private async loadGuildCommands(): Promise<void> {
    const commandsFiles = await this.getFilesFromFolder(`../guilds`);

    this.guildsCommands = await this.setCommandsInDict(commandsFiles);
  }

  private async loadGlobalCommands(): Promise<void> {
    const commandsFiles = await this.getFilesFromFolder(`../global`);

    this.guildsCommands = await this.setCommandsInDict(commandsFiles);
  }

  private async setCommandsInDict(listOfCommandsFile: string[]): Promise<{
    [key: string]: Command;
  }> {
    const commands: { [key: string]: Command } = {};

    for (const file of listOfCommandsFile) {
      const command: Command = (await import(file)).default;
      commands[command.name] = command;
    }

    return commands;
  }
}

const commandManager = new CommandManager();
export default commandManager;
