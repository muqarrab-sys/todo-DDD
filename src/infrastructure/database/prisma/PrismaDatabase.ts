import logger from '@/infrastructure/utils/logger';
import { PrismaClient } from '@prisma/client';
import { IDatabaseClient } from '../interface/IDatabaseClient';

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
      logger.info('Connected to Postgres via Prisma');
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
