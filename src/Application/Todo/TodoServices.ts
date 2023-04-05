import Todo from '@Domain/Entities/Todo';
import ITodoRepository from '@Domain/Entities/Todo/ITodoRepository';
import { ASCENDING } from '@Infrastructure/Constants';
import { UnAuthorizedException } from '@Infrastructure/Exceptions';
import Symbols from '@Infrastructure/IoC/Symbols';
import Pagination from '@Infrastructure/Utils/Pagination';
import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { SortOrder } from '@interfaces/index';
import { ITodo, TodoAttributes, TodoOrderByInput, TodoUserInput } from '@interfaces/todo';
import { inject, injectable } from 'inversify';
import { isNil } from 'lodash';

@injectable()
class TodoServices {
  constructor(@inject(Symbols.TodoRepository) private readonly repository: ITodoRepository) {}

  async create(data: ITodo) {
    data.uid = SharedUtils.uuid();

    const todo = await this.repository.create(data);

    return Todo.createFromDetails(todo);
  }

  async find(uid: string, userId: string) {
    const todo = await this.repository.find({ uid });
    if (todo.userId !== userId) throw new UnAuthorizedException('You are not authorized to view this item!');

    return Todo.createFromDetails(todo);
  }

  async findByUser(
    userId: string,
    data?: {
      page?: number;
      size?: number;
      isCompleted?: boolean;
      orderBy?: TodoAttributes;
      sortBy?: SortOrder;
    },
  ) {
    const pagination = Pagination.offsetPaginationQuery(data?.page, data?.size);

    const filter: Partial<ITodo> = {};
    filter.userId = userId;
    if (!isNil(data?.isCompleted)) filter.isCompleted = data?.isCompleted;

    const orderBy: TodoOrderByInput = {};
    if (data?.orderBy) orderBy[data?.orderBy] = data?.sortBy || ASCENDING;

    const response = await this.repository.findMany(filter, pagination, orderBy);

    return {
      todos: response.todos.map(todo => Todo.createFromDetails(todo)),
      count: response.count,
    };
  }

  async delete(userId: string, uid: string) {
    const todo = await this.repository.find({ uid });
    if (todo.userId !== userId) throw new UnAuthorizedException('You are not authorized to perform this action!');

    return await this.repository.delete(uid);
  }

  async update(uid: string, userId: string, data: Partial<TodoUserInput>) {
    let todo = await this.repository.find({ uid });
    if (todo.userId !== userId) throw new UnAuthorizedException('You are not authorized to perform this action!');

    todo = await this.repository.update(uid, data);

    return Todo.createFromDetails(todo);
  }
}

export default TodoServices;
