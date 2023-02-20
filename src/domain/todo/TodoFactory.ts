import Todo from '.';
import TodoService from './todo.service';
import { ITodoCreation } from './types';

class TodoFactory {
  async create(todoObj: ITodoCreation) {
    const service = new TodoService();
    const todoM = await service.create(todoObj);
    await todoM.save();

    return new Todo(todoM);
  }

  async load(id: string) {
    const service = new TodoService();
    const todo = await service.findById(id);

    return new Todo(todo);
  }

  async loadForUser(userId: string) {
    const service = new TodoService();
    const todoList = await service.findByUserId(userId);

    return todoList.map(todo => {
      return new Todo(todo);
    });
  }
}

export default TodoFactory;
