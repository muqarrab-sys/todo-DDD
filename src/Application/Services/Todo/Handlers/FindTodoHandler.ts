import { TodoServices } from '@Infrastructure/IoC/Containers';
import { FindTodoCommand } from '../Commands';

class FindTodoHandler {
  async handle(command: FindTodoCommand) {
    return await TodoServices.find(command.uid, command.userId);
  }
}

export default FindTodoHandler;
