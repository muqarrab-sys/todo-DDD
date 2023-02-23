import Todo from '@/domain/todo';
import ITodoRepository from '@/domain/todo/repository/ITodoRepository';
import { ITodoCreationObject } from '@/domain/todo/types';
import IUserRepository from '@/domain/user/repository/IUserRepository';

class CreateTodo {
  private todo_repository: ITodoRepository;
  private user_repository: IUserRepository;

  constructor(todo_repository: ITodoRepository, user_repository: IUserRepository) {
    this.todo_repository = todo_repository;
    this.user_repository = user_repository;
  }

  async execute(raw: ITodoCreationObject) {
    const user = await this.user_repository.find(raw.userId);
    if (!user) throw new Error("User doesn't exist");

    const todoM = await this.todo_repository.create(raw);

    const todo = Todo.create(todoM);

    return todo;
  }
}

export default CreateTodo;
