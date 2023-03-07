import Todo from '@Domain/Entities/Todo';
import { TodoInput } from '@interfaces/todo';
import Container from 'typedi';
import { CreateTodoCommand } from '../Commands';
import TodoService from '../TodoServices';

class CreateTodoHandler {
  async handle(command: CreateTodoCommand) {
    const service = Container.get(TodoService);

    return await service.create(Todo.create(command as TodoInput));
  }
}

export default CreateTodoHandler;
