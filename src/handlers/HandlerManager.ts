import { ClientEvents } from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';

import Event from '../libs/Event';
import Button from './buttons/shared/Button';
import buttonManager from './buttons/shared/ButtonManager';
import Command from './commands/shared/Command';
import commandManager from './commands/shared/CommandManager';
import eventManager from './events/shared/EventManager';
import Modal from './modals/shared/Modal';
import modalManager from './modals/shared/ModalManager';

const globPromise = promisify(glob);

export class HandlerManager {
  async load(): Promise<void> {
    await eventManager.load();
    await commandManager.load();
    await buttonManager.load();
  }

  getEvents(): Event<keyof ClientEvents>[] {
    return eventManager.getEvents();
  }

  getGuildsCommands(): { [key: string]: Command } {
    return commandManager.getGuildsCommands();
  }

  getGlobalCommands(): { [key: string]: Command } {
    return commandManager.getGlobalCommands();
  }

  getAllCommands(): { [key: string]: Command } {
    return { ...this.getGuildsCommands(), ...this.getGlobalCommands() };
  }

  getButtons(): { [key: string]: Button } {
    return buttonManager.getButtons();
  }

  getModals(): { [key: string]: Modal } {
    return modalManager.getModals();
  }

  async getFilesFromFolder(folder: string): Promise<string[]> {
    return await globPromise(`${__dirname}/${folder}/*{.ts,.js}`);
  }
}
const handlerManager: HandlerManager = new HandlerManager();

export default handlerManager;
