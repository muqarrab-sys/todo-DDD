import { IUser } from '@interfaces/user';
import { Command } from 'simple-command-bus';

class CreateTodoCommand extends Command {
  constructor(
    public readonly user: IUser,
    public readonly title: string,
    public readonly dueDate: Date,
    public readonly description?: string,
    public readonly isCompleted?: boolean,
  ) {
    super();
  }
}

export default CreateTodoCommand;
