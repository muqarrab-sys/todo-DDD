import { TodoServices } from '@Infrastructure/IoC/Containers';
import { DeleteTodoCommand } from '../Commands';

class DeleteTodoHandler {
  async handle(command: DeleteTodoCommand) {
    return await TodoServices.delete(command.userId, command.uid);
  }
}

export default DeleteTodoHandler;
