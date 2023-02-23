import CreateTodo from '@/application/use_cases/todo/CreateTodo';
import SearchTodos from '@/application/use_cases/todo/SearchTodos';
import { ITodoCreationObject } from '@/domain/todo/types';
import TodoRepository from '@/infra/persistence/repositories/todo.repository';
import UserRepository from '@/infra/persistence/repositories/user.repository';
import { IHandler } from '../interfaces/express';
import BaseController from './base/BaseController';

class TodoController extends BaseController {
  create: IHandler = async (req, res, next) => {
    const body: ITodoCreationObject = req.body;

    const todo_repository = new TodoRepository();
    const user_repository = new UserRepository();

    const useCase = new CreateTodo(todo_repository, user_repository);

    const todo = await useCase.execute(body);

    res.status(201).json({ success: true, data: todo });
  };

  findByUserId: IHandler = async (req, res, next) => {
    const { userId } = req.params;

    const todo_repository = new TodoRepository();

    const useCase = new SearchTodos(todo_repository);

    const todos = await useCase.execute(userId);

    res.status(200).json({ success: true, data: todos });
  };
}

export default TodoController;
