import TodoService from '@Application/Services/Todo/TodoServices';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import Todo from '@Domain/Entities/Todo';
import TodoRepository from '@Infrastructure/Repositories/TodoRepository';
import { IdObject, IHandler } from '@interfaces/index';
import { ITodoSearchObject, TodoCreationObject, TodoUpdateObject } from '@interfaces/todo';
import { isNil, omitBy } from 'lodash';
import BaseController from './Base/BaseController';

class TodoController extends BaseController {
  private service: TodoService;

  constructor() {
    super();

    this.service = new TodoService(TodoRepository);
  }

  create: IHandler = async (req, res) => {
    const data: TodoCreationObject = req.body;

    const todo = Todo.create({
      title: data.title,
      description: data.description,
      isCompleted: data.isCompleted,
      dueDate: data.dueDate,
      userId: req.user.uid,
    });

    const response = await this.service.create(todo);

    res.status(201).json(HttpResponse.ok(response, 'Todo Created!'));
  };

  find: IHandler = async (req, res) => {
    const { uid } = req.params as IdObject;

    const response = await this.service.find(uid, req.user.uid);

    res.status(200).json(HttpResponse.ok(response));
  };

  findByUser: IHandler = async (req, res) => {
    const { size, page, isCompleted, orderBy, sortBy } = req.query as ITodoSearchObject;

    const response = await this.service.findByUser(req.user.uid, {
      size,
      page,
      isCompleted,
      orderBy,
      sortBy,
    });

    res.status(200).json(HttpResponse.ok(response));
  };

  delete: IHandler = async (req, res) => {
    const { uid } = req.params as IdObject;

    await this.service.delete(req.user.uid, uid);

    res.status(200).json(HttpResponse.ok({}, 'Deleted!'));
  };

  update: IHandler = async (req, res) => {
    const { uid } = req.params as IdObject;
    const body = req.body as TodoUpdateObject;

    const response = await this.service.update(uid, req.user.uid, omitBy(body, isNil));

    res.status(200).json(HttpResponse.ok(response, 'Updated'));
  };
}

export default TodoController;
