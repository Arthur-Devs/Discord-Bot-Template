import { DataSource } from 'typeorm';

import { catchError } from '../utils/Utils';

export default class DatabaseManager {
  private static instance: DatabaseManager;

  private dataSource!: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      logging: false
    });
  }

  public static async init(): Promise<void> {
    DatabaseManager.instance = new DatabaseManager();
    await DatabaseManager.instance.init();
  }

  private async init() {
    try {
      await this.dataSource.initialize();
    } catch (error) {
      catchError(error);
    }
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      throw new Error('DatabaseManager not initialized');
    }
    return DatabaseManager.instance;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}
