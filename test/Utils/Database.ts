import PrismaDatabase from '../../src/Infrastructure/Database/Prisma/PrismaDatabase';
import { Database } from '../../src/Infrastructure/IoC/Containers';

class MockDatabase {
  private dbClient: PrismaDatabase;

  constructor() {
    this.dbClient = Database;
  }

  async connect() {
    await this.dbClient.connect();
  }

  async disconnect() {
    await this.dbClient.disconnect();
  }

  get client() {
    return this.dbClient.client;
  }
}

export default MockDatabase;
