import ServicesProvider from '@Application/ServicesProvider';
import Configs from '@Infrastructure/Configs';
import DatabaseProvider from '@Infrastructure/Database/DatabaseProvider';
import NodeMailer from '@Infrastructure/Mailer/NodeMailer';
import RepositoryProvider from '@Infrastructure/Repositories/RepositoryProvider';
import SlackNotifier from '@Infrastructure/Utils/SlackNotifier';
import logger from '@Infrastructure/Utils/logger';
import { ILogger, IMailer } from '@interfaces/index';
import { Container } from 'inversify';
import Symbols from './Symbols';

export default function ServicesBinder() {
  let c = new Container({ autoBindInjectable: true });

  c.bind<typeof Configs>(Symbols.Configs).toConstantValue(Configs);
  c.bind<ILogger>(Symbols.Logger).toConstantValue(logger);
  c.bind<IMailer>(Symbols.NodeMailer).to(NodeMailer);
  c.bind<SlackNotifier>(Symbols.SlackNotifier).to(SlackNotifier);

  c = DatabaseProvider(c);
  c = RepositoryProvider(c);
  c = ServicesProvider(c);

  return c;
}
