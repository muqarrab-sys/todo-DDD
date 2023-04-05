import { Logger } from '@Infrastructure/IoC/Containers';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import Configs from '../../Configs';
import Entities from './Entities';
import Symbols from '@Infrastructure/IoC/Symbols';

type DBConfigs = typeof Configs.database;

@injectable()
class TypeORMDatabase implements IDatabaseClient<DataSource> {
  private orm: DataSource;

  constructor(@inject(Symbols.Configs) readonly configs: typeof Configs) {
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
      Logger.info('Using TypeORM');
      await this.orm.initialize();
      Logger.info('Database connected: Postgres');
    } catch (error) {
      Logger.error(error);
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
