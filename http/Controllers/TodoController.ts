import commandBus from '@Application/CommandBus';
import { CreateTodoCommand, DeleteTodoCommand, FindManyTodoCommand, FindTodoCommand, UpdateTodoCommand } from '@Application/Todo/Commands';
import { ITodoSearchObject, TodoCreationObject, TodoUserInput } from '@interfaces/Todo';
import { IHandler } from '@interfaces/express/types';
import { IdObject } from '@interfaces/index';
import { isNil, omitBy } from 'lodash';
import BaseController from './Base/BaseController';

class TodoController extends BaseController {
  public create: IHandler = async req => {
    const data: TodoCreationObject = req.body;

    const command = new CreateTodoCommand(req.user, data.title, data.dueDate, data.description, data.isCompleted);
    const response = await commandBus.handle(command);

    return this.created(response, 'Todo Created!');
  };

  public find: IHandler = async req => {
    const { uid }: IdObject = req.params;

    const command = new FindTodoCommand(uid, req.user.uid);
    const response = await commandBus.handle(command);

    return this.ok(response);
  };

  public findByUser: IHandler = async req => {
    const { size, page, isCompleted, orderBy, sortBy }: ITodoSearchObject = req.query;

    const command = new FindManyTodoCommand(req.user.uid, { isCompleted }, { page, size, sortBy, orderBy });
    const response = await commandBus.handle(command);

    return this.ok(response);
  };

  public delete: IHandler = async req => {
    const { uid }: IdObject = req.params;

    const command = new DeleteTodoCommand(uid, req.user.uid);
    await commandBus.handle(command);

    return this.ok({}, 'Deleted!');
  };

  public update: IHandler = async req => {
    const { uid }: IdObject = req.params;
    const body: Partial<TodoUserInput> = req.body;

    const command = new UpdateTodoCommand(uid, req.user.uid, omitBy(body, isNil));
    const response = await commandBus.handle(command);

    return this.ok(response, 'Todo Updated!');
  };
}

export default TodoController;
