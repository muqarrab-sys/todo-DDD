import Todo from '@/domain/entities/todo';
import { ITodoValidationObject } from '@/domain/entities/todo/types';
import TodoRepository from '@/infrastructure/repositories/TodoRepository';
import SharedUtils from '@/infrastructure/utils/SharedUtils';
import { IHandler } from '@/interfaces';
import HttpResponse from '../utils/HttpResponse';
import BaseController from './base/BaseController';

class TodoController extends BaseController {
  create: IHandler = async (req, res) => {
    const data: ITodoValidationObject = req.body;

    const repo = new TodoRepository();

    const dbTodo = await repo.create({
      ...data,
      uid: SharedUtils.uuid(),
      userId: req.currentUser.id,
    });

    const todo = Todo.createFromDetails(dbTodo);

    res.status(201).json(HttpResponse.ok(todo));
  };

  find: IHandler = async (req, res) => {};

  findMany: IHandler = async (req, res) => {};

  delete: IHandler = async (req, res) => {};

  complete: IHandler = async (req, res) => {};

  update: IHandler = async (req, res) => {};
}

export default TodoController;
