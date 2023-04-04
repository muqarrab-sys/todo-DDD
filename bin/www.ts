require('dotenv').config();
import 'reflect-metadata';

import { Database } from '@Infrastructure/IoC/Containers';
import Routes from '@http/Routes';
import { Command } from 'commander';
import figlet from 'figlet';
import App from './App';
import onExit from './Exit';

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

  await onExit(app, Database);

  app.initiateRoutes(routers);
  await app.connectDatabase(Database);
  app.setPort(port || process.env.PORT || 8080);
  app.start();
}

init();
