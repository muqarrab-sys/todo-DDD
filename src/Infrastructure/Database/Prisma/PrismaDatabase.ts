import { Logger } from '@Infrastructure/IoC/Containers';
import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
class PrismaDatabase implements IDatabaseClient<PrismaClient> {
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
      Logger.info('Using Prisma');
      Logger.info('Database Connected: Postgres');
    } catch (error) {
      Logger.error(error);
    }
  }

  async disconnect() {
    try {
      await this.prisma.$disconnect();
      Logger.info('Postgres Disconnected');
    } catch (error) {
      Logger.error(error);
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
