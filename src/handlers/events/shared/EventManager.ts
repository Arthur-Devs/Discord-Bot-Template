import { ClientEvents } from 'discord.js';

import Event from '../../../libs/Event';
import { HandlerManager } from '../../HandlerManager';

class EventManager extends HandlerManager {
  private events: Event<keyof ClientEvents>[] = [];

  public getEvents(): Event<keyof ClientEvents>[] {
    return this.events;
  }

  public async load(): Promise<void> {
    const files = await this.getFilesFromFolder('..');
    this.loadEventHandlers(files);
  }

  private async loadEventHandlers(files: string[]): Promise<void> {
    this.events = await Promise.all(
      files.map(async (file) => {
        const { eventName, eventRun }: Event<keyof ClientEvents> = (await import(file)).EVENT;
        return { eventName, eventRun };
      })
    );
  }
}

const eventManager = new EventManager();
export default eventManager;
