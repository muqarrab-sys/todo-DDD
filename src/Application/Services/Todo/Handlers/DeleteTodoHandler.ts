import Container from 'typedi';
import { DeleteTodoCommand } from '../Commands';
import TodoService from '../TodoServices';

class DeleteTodoHandler {
  async handle(command: DeleteTodoCommand) {
    const service = Container.get(TodoService);

    return await service.delete(command.userId, command.uid);
  }
}

export default DeleteTodoHandler;
