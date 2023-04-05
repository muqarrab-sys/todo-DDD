import { TodoUserInput } from '@interfaces/todo';
import { Command } from 'simple-command-bus';

class UpdateTodoCommand extends Command {
  constructor(public readonly uid: string, public readonly userId: string, public readonly data: Partial<TodoUserInput>) {
    super();
  }
}

export default UpdateTodoCommand;
