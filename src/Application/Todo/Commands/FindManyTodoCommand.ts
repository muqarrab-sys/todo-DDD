import { ISearchQuery, SortOrder } from '@interfaces/index';
import { ITodo, TodoFilter } from '@interfaces/todo';
import { Command } from 'simple-command-bus';

class FindManyTodoCommand extends Command {
  constructor(public readonly userId: string, public readonly filter?: TodoFilter, public readonly paging?: ISearchQuery<ITodo>) {
    super();
  }
}

export default FindManyTodoCommand;
