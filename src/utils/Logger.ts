import fs from 'fs';

import { formatDate } from './Utils';

export default class Logger {
  private static instance: Logger;

  private logFolder = `${__dirname}/../logs`;
  private startingDate = new Date();
  private formatDate = '[YYYY-MM-DD HH:mm:ss]';

  private constructor() {
    //this.logFolder = config.logger.logFolder;
    //this.formatDate = config.logger.logFormat;

    if (!fs.existsSync(this.logFolder)) fs.mkdirSync(this.logFolder);

    if (process.env.TS_NODE_DEV) {
      this.clearLogs();
    }

    this.createLogFile();

    this.info('Logger started', true);
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(prefix: string, data: string, print: boolean) {
    const log = `${formatDate(new Date(), this.formatDate)}[${prefix}] ${data}`;
    if (print) console.log(log);
    fs.appendFileSync(`${this.logFolder}/latest.txt`, log + '\n');
  }

  info(data: string, print = false) {
    this.log(`INFO`, data, print);
  }

  warning(data: string, print = false) {
    this.log(`WARNING`, data, print);
  }

  error(data: string, print = true) {
    this.log(`ERROR`, data, print);
  }

  saveLog() {
    fs.renameSync(
      `${this.logFolder}/latest.txt`,
      `${this.logFolder}/${formatDate(this.startingDate, 'YYYYMMDDHHmmss')}.txt`
    );
  }

  createLogFile() {
    if (fs.existsSync(`${this.logFolder}/latest.txt`)) {
      fs.unlinkSync(`${this.logFolder}/latest.txt`);
    }
    fs.writeFileSync(`${this.logFolder}/latest.txt`, '');
  }

  clearLogs() {
    fs.readdirSync(this.logFolder).forEach((file: string): void => {
      if (file != 'latest.txt') fs.unlinkSync(`${this.logFolder}/${file}`);
    });
  }
}
