import NodeMailer from '@Infrastructure/Utils/NodeMailer';
import SlackNotifier from '@Infrastructure/Utils/SlackNotifier';
import { IUser } from '@interfaces/user';
import EventEmitter from 'events';

class RegisterUserEvent extends EventEmitter {
  constructor() {
    super();

    this.initialize();
  }

  private async initialize() {
    this.on('registerUser', this.notify);
  }

  private async notify(user: IUser) {
    const nodeMailer = NodeMailer.create();
    const slacker = SlackNotifier.create();

    await nodeMailer.send({
      to: user.email,
      subject: 'You have been registered!',
      body: 'You have been registered',
    });

    await slacker.client.send({
      text: `A user is created.\n\nName: ${user.name}\nEmail: ${user.email}`,
      icon_url: 'https://picsum.photos/id/237/200/300',
      username: 'System',
    });
  }
}

export default RegisterUserEvent;
