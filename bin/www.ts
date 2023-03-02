require('dotenv').config();
import 'reflect-metadata';

import PrismaDatabase from '@Infrastructure/Database/Prisma/PrismaDatabase';
import Routes from '@http/Routes';
import { Command } from 'commander';
import figlet from 'figlet';
import App from './App';

console.log(figlet.textSync('Todo APP - DDD'));

interface IOpts {
  port: number;
  env: string;
  seed: string;
  seedAmount: number;
}

const program = new Command();
const { seed, seedAmount, port, env } = program
  .version('1.0.0')
  .description('A Todo App build with DDD paradigm')
  .option('-p, --port <port>', 'Port to listen on', parseInt)
  .option('-s, --seed <seed>', 'Seed Database')
  .option('--seedAmount <seedAmount>', 'Set how many records should be added (default: 100)', parseInt)
  .option('-e, --env <env>', 'Set Environment (default: Dev)')
  .parse(process.argv)
  .opts() as IOpts;

// if (seed) {
//   let opt = seed?.toLowerCase();
//   const entities = ['user', 'todo'];

//   async function seedData() {
//     if (!entities.includes(opt)) {
//       console.log(`${seed} is not an entity`);
//       process.exit(1);
//     } else {
//       const seeder = new SeedFactory().create(opt);
//       await seeder?.execute(seedAmount || 100);

//       console.log(`${seed} table has been seeded`);
//       process.exit(0);
//     }
//   }

//   seedData();
// }

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
