require('dotenv').config();
import 'reflect-metadata';

import Routes from '@http/Routes';
import PrismaDatabase from '@Infrastructure/Database/Prisma/PrismaDatabase';
import { Command } from 'commander';
import figlet from 'figlet';
import App from './App';

console.log(figlet.textSync('Todo APP - DDD'));

interface IOpts {
  port: number;
  env: string;
}

const program = new Command();
const { port, env } = program
  .version('1.0.0')
  .description('A Todo App build with DDD paradigm')
  .option('-p, --port <port>', 'Port to listen on', parseInt)
  .option('-e, --env <env>', 'Set Environment (default: Dev)')
  .parse(process.argv)
  .opts() as IOpts;

async function init() {
  const app = new App();

  const routers = Routes.build();
  app.initiateRoutes(routers);

  const database = new PrismaDatabase();
  await app.connectDatabase(database);

  app.setPort(port || process.env.PORT || 8080);
  app.start();
}

init();
