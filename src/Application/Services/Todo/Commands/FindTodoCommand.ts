import { Command } from 'simple-command-bus';

class FindTodoCommand extends Command {
  constructor(public readonly uid: string, public readonly userId: string) {
    super();
  }
}

export default FindTodoCommand;
