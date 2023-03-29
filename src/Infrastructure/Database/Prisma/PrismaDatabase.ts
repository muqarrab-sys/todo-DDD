import logger from '@Infrastructure/Utils/logger';
import { PrismaClient } from '@prisma/client';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import SharedUtils from '@Infrastructure/Utils/SharedUtils';

class PrismaDatabase implements IDatabaseClient {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();

    this.initiateMiddleware();
  }

  get client(): PrismaClient {
    return this.prisma;
  }

  async connect() {
    try {
      await this.prisma.$connect();
      logger.info('Database Connected: Postgres');
    } catch (error) {
      logger.error(error);
    }
  }

  async disconnect() {
    try {
      await this.prisma.$disconnect();
      logger.info('Postgres Disconnected');
    } catch (error) {
      logger.error(error);
    }
  }

  initiateMiddleware() {
    this.prisma.$use(async (params, next) => {
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
