import NodeMailer from '@Infrastructure/Utils/NodeMailer';
import EventEmitter from 'events';

class CreateTodoEvent extends EventEmitter {
  constructor() {
    super();

    this.initialize();
  }

  private async initialize() {
    this.on('send', this.sendMail);
  }

  private async sendMail() {
    const nodeMailer = NodeMailer.create();

    await nodeMailer.send({
      to: 'mhs8660@gmail.com',
      subject: 'Your Todo is created!',
      body: 'Your todo is created successfully',
    });
  }
}

export default CreateTodoEvent;
