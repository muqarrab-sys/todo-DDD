import logger from '@Infrastructure/Utils/logger';
import { PrismaClient } from '@prisma/client';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';

class PrismaDatabase implements IDatabaseClient {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
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
}

export default PrismaDatabase;
