import { Mailer } from '@Infrastructure/IoC/Containers';
import { ITodo } from '@interfaces/todo';
import { IUser } from '@interfaces/user';
import EventEmitter from 'events';

class CreateTodoEvent extends EventEmitter {
  constructor() {
    super();

    this.initialize();
  }

  private async initialize() {
    this.on('send', this.sendMail);
  }

  private async sendMail(todo: ITodo, user: IUser) {
    await Mailer.send({
      to: user.email,
      subject: 'Your Todo is created!',
      body: 'Your todo is created successfully',
    });
  }
}

export default CreateTodoEvent;
