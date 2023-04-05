import { Logger } from '@Infrastructure/IoC/Containers';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import App from './App';

export default async function onExit(app: App, database: IDatabaseClient) {
  process.on('SIGINT', async () => {
    try {
      app.close();
      await database.disconnect();
    } catch (error) {
      Logger.error(error);
    }
  });
}
