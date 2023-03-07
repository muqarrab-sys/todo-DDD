import { TodoUpdateObject } from '@interfaces/todo';
import { Command } from 'simple-command-bus';

class UpdateTodoCommand extends Command {
  constructor(public readonly uid: string, public readonly userId: string, public readonly data: TodoUpdateObject) {
    super();
  }
}

export default UpdateTodoCommand;
