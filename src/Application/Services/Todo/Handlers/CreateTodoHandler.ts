import Todo from '@Domain/Entities/Todo';
import CreateTodoEvent from '@Domain/Events/CreateTodoEvent';
import { TodoDomainService } from '@Infrastructure/IoC/Containers';
import { ITodo } from '@interfaces/todo';
import { CreateTodoCommand } from '../Commands';

class CreateTodoHandler {
  async handle(command: CreateTodoCommand) {
    const todo = await TodoDomainService.create(Todo.create(command as Partial<ITodo>));

    const event = new CreateTodoEvent();
    event.emit('send', todo);

    return todo;
  }
}

export default CreateTodoHandler;
