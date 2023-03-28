import NodeMailer from '@Infrastructure/Utils/NodeMailer';
import { IUser } from '@interfaces/user';
import EventEmitter from 'events';

class RegisterUserEvent extends EventEmitter {
  constructor() {
    super();

    this.initialize();
  }

  private async initialize() {
    this.on('registerUser', this.sendMail);
  }
  private async sendMail(user: IUser) {
    const nodeMailer = NodeMailer.create();

    await nodeMailer.send({
      to: user.email,
      subject: 'You have been registered!',
      body: 'You have been registered',
    });
  }
}

export default RegisterUserEvent;
