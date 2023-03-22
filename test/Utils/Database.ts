import PrismaDatabase from '../../src/Infrastructure/Database/Prisma/PrismaDatabase';

class Database {
  private dbClient: PrismaDatabase;

  constructor() {
    this.dbClient = new PrismaDatabase();
  }

  async connect() {
    await this.dbClient.connect();
  }

  async disconnect() {
    await this.dbClient.disconnect();
  }

  get client() {
    return this.dbClient.getClient();
  }
}

export default Database;
