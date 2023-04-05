import { TodoServices } from '@Infrastructure/IoC/Containers';
import { FindManyTodoCommand } from '../Commands';

class FindManyTodoHandler {
  async handle(command: FindManyTodoCommand) {
    return await TodoServices.findByUser(command.userId, { ...command.filter, ...command.paging });
  }
}

export default FindManyTodoHandler;
