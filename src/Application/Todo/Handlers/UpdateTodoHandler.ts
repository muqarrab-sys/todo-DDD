import { TodoServices } from '@Infrastructure/IoC/Containers';
import { UpdateTodoCommand } from '../Commands';

class UpdateTodoHandler {
  async handle(command: UpdateTodoCommand) {
    return await TodoServices.update(command.uid, command.userId, command.data);
  }
}

export default UpdateTodoHandler;
