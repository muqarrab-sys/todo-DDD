import Todo from '@Domain/Entities/Todo';
import { TodoServices } from '@Infrastructure/IoC/Containers';
import { ITodo } from '@interfaces/Todo';
import { CreateTodoCommand } from '../Commands';
import EventNames, { EventEmitter } from '@Infrastructure/Events';
import { ITodoCreatedEvent } from '@interfaces/Events';

class CreateTodoHandler {
  async handle(command: CreateTodoCommand) {
    const newTodo = await TodoServices.create(Todo.create({ userId: command.user.uid, ...command } as Partial<ITodo>));

    const event: ITodoCreatedEvent = {
      title: newTodo.title,
      description: newTodo.description,
      ocurredAt: new Date(),
      email: command.user.email,
    };

    EventEmitter.emit(EventNames.TodoCreatedEvent, event);

    return newTodo;
  }
}

export default CreateTodoHandler;
