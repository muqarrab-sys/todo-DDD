import NodeMailer from '@Infrastructure/Utils/NodeMailer';
import EventEmitter from 'events';

class RegisterUserEvent extends EventEmitter {
  constructor() {
    super();

    this.initialize();
  }

  private async initialize() {
    this.on('registerUser', this.sendMail);
  }
  private async sendMail(user) {
    const nodeMailer = NodeMailer.create();

    await nodeMailer.send({
      to: user.email,
      subject: 'You have been registered!',
      body: 'You have been registered',
    });
  }
}

export default RegisterUserEvent;
