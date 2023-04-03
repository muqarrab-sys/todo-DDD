import ServicesProvider from '@Application/Services/ServicesProvider';
import Configs from '@Infrastructure/Configs';
import DatabaseProvider from '@Infrastructure/Database/DatabaseProvider';
import RepositoryProvider from '@Infrastructure/Repositories/RepositoryProvider';
import { Container } from 'inversify';

export default function BindContainer() {
  let c = new Container({ autoBindInjectable: true });

  c.bind<typeof Configs>('configs').toConstantValue(Configs);

  c = DatabaseProvider(c);
  c = RepositoryProvider(c);
  c = ServicesProvider(c);

  return c;
}
