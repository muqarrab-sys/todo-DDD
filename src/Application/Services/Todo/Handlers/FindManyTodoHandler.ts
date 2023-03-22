import { TodoDomainService } from '@Infrastructure/IoC/Containers';
import { FindManyTodoCommand } from '../Commands';

class FindManyTodoHandler {
  async handle(command: FindManyTodoCommand) {
    return await TodoDomainService.findByUser(command.userId, { ...command.filter, ...command.paging, ...command.sort });
  }
}

export default FindManyTodoHandler;
