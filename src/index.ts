import 'reflect-metadata';

import { config as ENVconfig } from 'dotenv';

import Bot from './Bot';
import DatabaseManager from './database/DatabaseManager';
import Logger from './utils/Logger';
import { catchError, setupExitProcess } from './utils/Utils';

async function prepareStart() {
  setupExitProcess(() => {
    const logger = Logger.getInstance();
    logger.info('Exiting...');
    logger.clearLogs();
    logger.saveLog();
  });

  ENVconfig({ path: `${__dirname}/../.env` });
  await DatabaseManager.init();
}

function start() {
  const token = process.env.BOT_TOKEN;
  if (!token) catchError(new Error('Token not found'), true);
  else startBot(token);
}

function startBot(token: string) {
  const BOT = new Bot(token);
  if (process.env.BOT_TOKEN) BOT.start();
}

(async () => {
  await prepareStart();
  start();
})();
