import { Container } from 'inversify';
import PrismaDatabase from './Prisma/PrismaDatabase';
import TypeORMDatabase from './TypeOrm/TypeORMDatabase';
import Symbols from '@Infrastructure/IoC/Symbols';

function DatabaseProvider(c: Container) {
  c.bind<PrismaDatabase>(Symbols.PrismaDatabase).to(PrismaDatabase);
  c.bind<TypeORMDatabase>(Symbols.TypeOrmDatabase).to(TypeORMDatabase);

  return c;
}

export default DatabaseProvider;
