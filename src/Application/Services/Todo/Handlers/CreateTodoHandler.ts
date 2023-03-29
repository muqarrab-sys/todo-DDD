import Todo from '@Domain/Entities/Todo';
import CreateTodoEvent from '@Application/Events/CreateTodoEvent';
import { TodoServices } from '@Infrastructure/IoC/Containers';
import { ITodo } from '@interfaces/todo';
import { CreateTodoCommand } from '../Commands';

class CreateTodoHandler {
  async handle(command: CreateTodoCommand) {
    const newTodo = await TodoServices.create(Todo.create({ userId: command.user.uid, ...command } as Partial<ITodo>));

    const event = new CreateTodoEvent();
    event.emit('send', newTodo, command.user);

    return newTodo;
  }
}

export default CreateTodoHandler;
