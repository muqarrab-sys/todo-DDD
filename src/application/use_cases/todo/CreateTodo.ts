import { NotFoundException } from '@/application/exceptions';
import Todo from '@/domain/todo';
import ITodoRepository from '@/domain/todo/repository/ITodoRepository';
import { ITodoCreationObject } from '@/domain/todo/types';
import IUserRepository from '@/domain/user/repository/IUserRepository';

class CreateTodo {
  private todoRepository: ITodoRepository;
  private userRepository: IUserRepository;

  constructor(todoRepository: ITodoRepository, user_repository: IUserRepository) {
    this.todoRepository = todoRepository;
    this.userRepository = user_repository;
  }

  async execute(raw: ITodoCreationObject) {
    const user = await this.userRepository.find(raw.userId);
    if (!user) throw new NotFoundException("User doesn't exist");

    const todoM = await this.todoRepository.create(raw);

    const todo = Todo.create(todoM);

    return todo;
  }
}

export default CreateTodo;
