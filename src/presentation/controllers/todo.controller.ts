import CreateTodo from '@/application/use_cases/todo/CreateTodo';
import PaginatedSearchTodos from '@/application/use_cases/todo/PaginatedSearchTodos';
import { ITodoCreationObject, ITodoSearchObject } from '@/domain/todo/types';
import TodoRepository from '@/infra/persistence/repositories/todo.repository';
import { IHandler } from '../interfaces/express';
import BaseController from './base/BaseController';

class TodoController extends BaseController {
  create: IHandler = async (req, res) => {
    const body: ITodoCreationObject = req.body;

    const todoRepository = new TodoRepository();

    const useCase = new CreateTodo(todoRepository);

    const todo = await useCase.execute({ ...body, userId: req.currentUser.id });

    res.status(201).json({ success: true, data: todo });
  };

  search: IHandler = async (req, res) => {
    const { page, limit } = req.query as ITodoSearchObject;

    const todoRepository = new TodoRepository();

    const useCase = new PaginatedSearchTodos(todoRepository);

    const todos = await useCase.execute(req.currentUser.id, page, limit);

    res.status(200).json({ success: true, data: { items: todos, count: todos.length } });
  };
}

export default TodoController;
