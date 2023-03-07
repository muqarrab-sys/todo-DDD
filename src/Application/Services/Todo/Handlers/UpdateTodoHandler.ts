import Container from 'typedi';
import { UpdateTodoCommand } from '../Commands';
import TodoService from '../TodoServices';

class UpdateTodoHandler {
  async handle(command: UpdateTodoCommand) {
    const service = Container.get(TodoService);

    return await service.update(command.uid, command.userId, command.data);
  }
}

export default UpdateTodoHandler;
