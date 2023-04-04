import ServicesProvider from '@Application/Services/ServicesProvider';
import Configs from '@Infrastructure/Configs';
import DatabaseProvider from '@Infrastructure/Database/DatabaseProvider';
import NodeMailer from '@Infrastructure/Mailer/NodeMailer';
import RepositoryProvider from '@Infrastructure/Repositories/RepositoryProvider';
import SlackNotifier from '@Infrastructure/Utils/SlackNotifier';
import { Container } from 'inversify';

export default function BindContainer() {
  let c = new Container({ autoBindInjectable: true });

  c.bind<typeof Configs>('configs').toConstantValue(Configs);
  c.bind<NodeMailer>(NodeMailer).to(NodeMailer);
  c.bind<SlackNotifier>(SlackNotifier).to(SlackNotifier);

  c = DatabaseProvider(c);
  c = RepositoryProvider(c);
  c = ServicesProvider(c);

  return c;
}
