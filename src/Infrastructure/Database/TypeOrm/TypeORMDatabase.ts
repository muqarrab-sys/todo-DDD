import { Logger } from '@Infrastructure/IoC/Containers';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import Configs from '../../Configs';
import Entities from './Entities';
import Symbols from '@Infrastructure/IoC/Symbols';
import { ILogger } from '@interfaces/index';

type DBConfigs = typeof Configs.database;

@injectable()
class TypeORMDatabase implements IDatabaseClient<DataSource> {
  private orm: DataSource;

  constructor(@inject(Symbols.Configs) readonly configs: typeof Configs, @inject(Symbols.Logger) private readonly logger: ILogger) {
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
      this.logger.info('Using TypeORM');
      await this.orm.initialize();
      this.logger.info('Database connected: Postgres');
    } catch (error) {
      this.logger.error(error);
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
