import Container from 'typedi';
import { FindManyTodoCommand } from '../Commands';
import TodoService from '../TodoServices';

class FindManyTodoHandler {
  async handle(command: FindManyTodoCommand) {
    const service = Container.get(TodoService);

    return await service.findByUser(command.userId, { ...command.filter, ...command.paging, ...command.sort });
  }
}

export default FindManyTodoHandler;
