import Todo from '@/domain/todo';
import ITodoRepository from '@/domain/todo/repository/ITodoRepository';
import { ITodoCreationObject } from '@/domain/todo/types';

class CreateTodo {
  private todoRepository: ITodoRepository;

  constructor(todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(raw: ITodoCreationObject) {
    const todoM = await this.todoRepository.create(raw);

    const todo = Todo.create(todoM);

    return todo;
  }
}

export default CreateTodo;
