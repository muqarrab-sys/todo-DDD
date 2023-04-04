import Configs from '@Infrastructure/Configs';
import { inject, injectable } from 'inversify';
import Slack, { SlackNotify } from 'slack-notify';
import { SendArgs } from 'slack-notify';

@injectable()
class SlackNotifier {
  private client: SlackNotify;

  constructor(@inject('configs') config: typeof Configs) {
    this.client = Slack(config.slack.webhookUrl);
  }

  async notify(args: string | SendArgs): Promise<void> {
    this.client.send(args);
  }
}

export default SlackNotifier;
