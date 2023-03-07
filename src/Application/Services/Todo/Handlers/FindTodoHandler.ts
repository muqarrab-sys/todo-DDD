import Container from 'typedi';
import { FindTodoCommand } from '../Commands';
import TodoService from '../TodoServices';

class FindTodoHandler {
  async handle(command: FindTodoCommand) {
    const service = Container.get(TodoService);

    return await service.find(command.uid, command.userId);
  }
}

export default FindTodoHandler;
