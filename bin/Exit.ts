import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import App from './App';
import logger from '@Infrastructure/Utils/logger';

export default async function onExit(app: App, database: IDatabaseClient) {
  process.on('SIGINT', async () => {
    try {
      app.close();

      await database.disconnect();

      process.exit(0);
    } catch (error) {
      logger.error(error);
    }
  });
}
