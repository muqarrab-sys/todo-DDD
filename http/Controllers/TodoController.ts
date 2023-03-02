import Todo from '@Domain/Entities/Todo';
import { ITodoSearchObject, TodoCreationObject, TodoUpdateObject } from '@interfaces/todo';
import TodoRepository from '@Infrastructure/Repositories/TodoRepository';
import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { IdObject, IHandler } from '@interfaces/index';
import { isNil, omitBy } from 'lodash';
import TodoService from '@Application/Services/Todo/TodoServices';
import HttpResponse from '@Application/Utils/HttpResponse';
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
      uid: SharedUtils.uuid(),
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      userId: req.user.id,
    });

    const response = await this.service.create(todo);

    res.status(201).json(HttpResponse.ok(response, 'Todo Created!'));
  };

  find: IHandler = async (req, res) => {
    const { id } = req.params as IdObject;

    const response = await this.service.find(id, req.user.id);

    res.status(200).json(HttpResponse.ok(response));
  };

  findByUser: IHandler = async (req, res) => {
    const { limit, page, isCompleted, orderBy, sortBy } = req.query as ITodoSearchObject;

    const response = await this.service.findByUser(req.user.id, {
      limit,
      page,
      isCompleted,
      orderBy,
      sortBy,
    });

    res.status(200).json(HttpResponse.ok(response));
  };

  delete: IHandler = async (req, res) => {
    const { id } = req.params as IdObject;

    await this.service.delete(req.user.id, id);

    res.status(200).json(HttpResponse.ok({}, 'Deleted!'));
  };

  update: IHandler = async (req, res) => {
    const { id } = req.params as IdObject;
    const body = req.body as TodoUpdateObject;

    const response = await this.service.update(id, req.user.id, omitBy(body, isNil));

    res.status(200).json(HttpResponse.ok(response, 'Updated'));
  };
}

export default TodoController;
