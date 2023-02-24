import mongoose, { ConnectOptions } from 'mongoose';
import { isEmpty } from 'lodash';
import { IDatabaseConfigs } from '../interfaces';
import DatabasePort from '../database.port';
import logger from '@/infra/utils/logger';

class MongooseAdopter extends DatabasePort {
  protected options: ConnectOptions = {};

  constructor(private readonly configs: IDatabaseConfigs) {
    super();

    this.setDbUrl();
  }

  setStrictQuery(flag: boolean) {
    mongoose.set('strictQuery', flag);
  }

  async connect(): Promise<boolean> {
    try {
      await mongoose.connect(this.url, this.options);
      logger.info('Connected to Mongo');
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  private setDbUrl() {
    if (this.configs.url) {
      this.url = this.configs.url;
      return;
    }

    const options = {
      retryWrites: true,
      w: 'majority',
    };

    this.url = `mongodb+srv://${this.configs.username}:${this.configs.password}@${this.configs.host}/${this.optionsToString(options)}`;
  }

  private optionsToString(options: {}) {
    let str = '';

    for (let option in options) {
      str += isEmpty(str) ? '?' : '&';
      str += `${option}=${options[option]}`;
    }

    return str;
  }

  set connectOptions(options: ConnectOptions) {
    this.options = Object.assign(this.options, options);
  }
}

export default MongooseAdopter;
