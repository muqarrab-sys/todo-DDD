import commandBus from '@Application/CommandBus';
import { CreateTodoCommand, DeleteTodoCommand, FindManyTodoCommand, FindTodoCommand, UpdateTodoCommand } from '@Application/Services/Todo/Commands';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import { IdObject, IHandler } from '@interfaces/index';
import { ITodoSearchObject, TodoCreationObject, TodoUpdateObject } from '@interfaces/todo';
import { isNil, omitBy } from 'lodash';

class TodoController {
  create: IHandler = async (req, res) => {
    const data: TodoCreationObject = req.body;

    const command = new CreateTodoCommand(req.user.uid, data.title, data.dueDate, data.description, data.isCompleted);
    const response = await commandBus.handle(command);

    return HttpResponse.created(response);
  };

  find: IHandler = async (req, res) => {
    const { uid } = req.params as IdObject;

    const command = new FindTodoCommand(uid, req.user.uid);
    const response = await commandBus.handle(command);

    return HttpResponse.ok(response, 'Todo Created!');
  };

  findByUser: IHandler = async (req, res) => {
    const { size, page, isCompleted, orderBy, sortBy } = req.query as ITodoSearchObject;

    const command = new FindManyTodoCommand(req.user.uid, { isCompleted }, { page, size }, { sortBy, orderBy });
    const response = await commandBus.handle(command);

    return HttpResponse.ok(response);
  };

  delete: IHandler = async (req, res) => {
    const { uid } = req.params as IdObject;

    const command = new DeleteTodoCommand(uid, req.user.uid);
    await commandBus.handle(command);

    return HttpResponse.ok({}, 'Deleted!');
  };

  update: IHandler = async (req, res) => {
    const { uid } = req.params as IdObject;
    const body = req.body as TodoUpdateObject;

    const command = new UpdateTodoCommand(uid, req.user.uid, omitBy(body, isNil));
    const response = await commandBus.handle(command);

    return HttpResponse.ok(response, 'Todo Updated!');
  };
}

export default TodoController;
