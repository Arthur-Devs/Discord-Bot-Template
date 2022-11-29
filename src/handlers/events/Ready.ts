import { ActivityType } from 'discord.js';

import Event from '../../libs/Event';
import Logger from '../../utils/Logger';

export const EVENT = new Event('ready', ({ user }) => {
  const logger = Logger.getInstance();
  logger.info(`Logged in as ${user.tag}!`);
  user.setActivity(`MineLodge`, { type: ActivityType.Playing });
});
