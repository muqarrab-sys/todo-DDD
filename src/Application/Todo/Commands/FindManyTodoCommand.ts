import { ISearchQuery } from '@interfaces/IQuery';
import { ITodo, TodoFilter } from '@interfaces/Todo';
import { Command } from 'simple-command-bus';

class FindManyTodoCommand extends Command {
  constructor(public readonly userId: string, public readonly filter?: TodoFilter, public readonly paging?: ISearchQuery<ITodo>) {
    super();
  }
}

export default FindManyTodoCommand;
