import logger from '@Infrastructure/Utils/logger';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import Configs from '../../Configs';
import Entities from './Entities';

type DBConfigs = typeof Configs.database;

@injectable()
class TypeORMDatabase implements IDatabaseClient<DataSource> {
  private orm: DataSource;

  constructor(@inject('configs') readonly configs: typeof Configs) {
    this.setup(configs.database);
  }

  private setup(configs: DBConfigs) {
    this.orm = new DataSource({
      type: 'postgres',
      url: configs.url,
      synchronize: true,
      logging: true,
      entities: Entities,
      subscribers: [],
      migrations: [],
    });
  }

  async connect() {
    try {
      logger.info('Using TypeORM');
      await this.orm.initialize();
      logger.info('Database connected: Postgres');
    } catch (error) {
      logger.error(error);
    }
  }

  async disconnect() {
    await this.orm.destroy();
  }

  get client() {
    return this.orm;
  }
}

export default TypeORMDatabase;
