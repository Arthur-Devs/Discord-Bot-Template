import type { ClientEvents } from 'discord.js';

export default class Event<Key extends keyof ClientEvents> {
  constructor(public eventName: Key, public eventRun: (...args: ClientEvents[Key]) => void) {}
}
