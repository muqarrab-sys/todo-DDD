import logger from '@Infrastructure/Utils/logger';
import { PrismaClient } from '@prisma/client';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import SharedUtils from '@Infrastructure/Utils/SharedUtils';

class PrismaDatabase implements IDatabaseClient {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();

    this.initiateMiddleware();
  }

  getClient(): PrismaClient {
    return this.client;
  }

  async connect() {
    try {
      await this.client.$connect();
      logger.info('Database Connected: Postgres');
    } catch (error) {
      logger.error(error);
    }
  }

  async disconnect() {
    try {
      await this.client.$disconnect();
      logger.info('Postgres Disconnected');
    } catch (error) {
      logger.error(error);
    }
  }

  initiateMiddleware() {
    this.client.$use(async (params, next) => {
      if (params.action === 'create') {
        if (!params.args.data.uid) {
          params.args.data.uid = SharedUtils.uuid();
        }
      }

      return await next(params);
    });
  }
}

export default PrismaDatabase;
