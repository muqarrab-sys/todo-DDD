import Configs from '@Infrastructure/Configs';
import Symbols from '@Infrastructure/IoC/Symbols';
import { inject, injectable } from 'inversify';
import Slack, { SlackNotify } from 'slack-notify';
import { SendArgs } from 'slack-notify';

@injectable()
class SlackNotifier {
  private client: SlackNotify;

  constructor(@inject(Symbols.Configs) config: typeof Configs) {
    this.client = Slack(config.slack.webhookUrl);
  }

  async notify(args: string | SendArgs): Promise<void> {
    this.client.send(args);
  }
}

export default SlackNotifier;
