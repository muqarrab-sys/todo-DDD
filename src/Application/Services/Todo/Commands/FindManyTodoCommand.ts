import { SortOrder } from '@interfaces/index';
import { ITodo } from '@interfaces/todo';
import { Command } from 'simple-command-bus';

class FindManyTodoCommand extends Command {
  constructor(
    public readonly userId: string,
    public readonly filter?: { isCompleted: boolean },
    public readonly paging?: { size: number; page: number },
    public readonly sort?: { orderBy: keyof ITodo; sortBy: SortOrder },
  ) {
    super();
  }
}

export default FindManyTodoCommand;
