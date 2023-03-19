import { TodoDomainService } from '@Infrastructure/IoC/Containers';
import { DeleteTodoCommand } from '../Commands';

class DeleteTodoHandler {
  async handle(command: DeleteTodoCommand) {
    return await TodoDomainService.delete(command.userId, command.uid);
  }
}

export default DeleteTodoHandler;
