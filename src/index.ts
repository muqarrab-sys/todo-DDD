require('dotenv').config();
import 'reflect-metadata';
import App from './presentation/App';
import RoutesAdopter from './presentation/routes/Routes.adopter';
import MongoAdopter from './infra/database/mongo/mongo.adopter';
import dbConfigs from './infra/configs/database';

async function init() {
  const app = new App();

  const routers = new RoutesAdopter();
  const databaseAdopter = new MongoAdopter(dbConfigs);
  databaseAdopter.setStrictQuery(false);

  app.initiateRoutes(routers.modules);
  await app.connectDatabase(databaseAdopter);

  app.start();
}

init();
