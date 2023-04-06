import Symbols from '@Infrastructure/IoC/Symbols';
import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import { ILogger } from '@interfaces/index';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
class PrismaDatabase implements IDatabaseClient<PrismaClient> {
  private prisma: PrismaClient;

  constructor(@inject(Symbols.Logger) private readonly logger: ILogger) {
    this.prisma = new PrismaClient();

    this.initiateMiddleware();
  }

  get client(): PrismaClient {
    return this.prisma;
  }

  async connect() {
    try {
      await this.prisma.$connect();
      this.logger.info('Using Prisma');
      this.logger.info('Database Connected: Postgres');
    } catch (error) {
      this.logger.error(error);
    }
  }

  async disconnect() {
    try {
      await this.prisma.$disconnect();
      this.logger.info('Postgres Disconnected');
    } catch (error) {
      this.logger.error(error);
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
