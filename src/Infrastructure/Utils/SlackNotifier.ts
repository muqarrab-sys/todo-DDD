import Slack, { SlackNotify } from 'slack-notify';

class SlackNotifier {
  client: SlackNotify;

  constructor(config: string) {
    this.client = Slack(config);
  }

  static create() {
    return new SlackNotifier(process.env.SLACK_WEBHOOK_URL);
  }
}

export default SlackNotifier;
