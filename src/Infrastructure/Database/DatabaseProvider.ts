import { Container } from 'inversify';
import PrismaDatabase from './Prisma/PrismaDatabase';
import TypeORMDatabase from './TypeOrm/TypeORMDatabase';

function DatabaseProvider(c: Container) {
  c.bind<PrismaDatabase>(PrismaDatabase).to(PrismaDatabase);
  c.bind<TypeORMDatabase>(TypeORMDatabase).to(TypeORMDatabase);

  return c;
}

export default DatabaseProvider;
