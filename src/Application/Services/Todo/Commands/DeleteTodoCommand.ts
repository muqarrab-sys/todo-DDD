import { Command } from 'simple-command-bus';

class DeleteTodoCommand extends Command {
  constructor(public readonly uid: string, public readonly userId: string) {
    super();
  }
}

export default DeleteTodoCommand;
