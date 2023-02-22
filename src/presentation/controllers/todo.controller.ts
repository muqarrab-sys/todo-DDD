import TodoFactory from '@/domain/todo/TodoFactory';
import { IHandler } from '../interfaces/express';
import BaseController from './base/BaseController';

class TodoController extends BaseController {
  private factory: TodoFactory;

  constructor() {
    super();

    this.factory = new TodoFactory();
  }

  create: IHandler = async (req, res, next) => {
    const todoObj = req.body;

    const todo = await this.factory.create(todoObj);

    res.status(201).json({ success: true, data: todo.values });
  };

  find: IHandler = async (req, res, next) => {
    const { id } = req.params;

    const todo = await this.factory.load(id);

    res.status(200).json({ data: todo.values });
  };

  findByUserId: IHandler = async (req, res, next) => {
    const { userId } = req.params;

    const todos = await this.factory.loadForUser(userId);

    res.status(200).json({ success: true, data: todos });
  };
}

export default TodoController;
