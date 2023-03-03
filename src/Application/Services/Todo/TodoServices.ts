import Todo from '@Domain/Entities/Todo';
import ITodoRepository from '@Domain/Entities/Todo/Repository/ITodoRepository';
import { ITodo, TodoAttributes, TodoOrderByInput, TodoPartial, TodoUpdateObject } from '@interfaces/todo';
import { SortOrder } from '@interfaces/index';
import { isNil } from 'lodash';
import { ASCENDING } from '../../Constants';
import { NotFoundException, UnAuthorizedException } from '@Infrastructure/Exceptions';
import Pagination from '../../Utils/Pagination';
import BaseServices from '../BaseServices';

class TodoService extends BaseServices<ITodoRepository> {
  constructor(Repository: { new (): ITodoRepository }) {
    super(Repository);
  }

  async create(data: ITodo) {
    const todo = await this.repository.create(data);

    return Todo.createFromDetails(todo);
  }

  async find(uid: string, userId: string) {
    const todo = await this.repository.find({ uid });
    if (!todo) throw new NotFoundException('Item not found!');
    if (todo.userId !== userId) throw new UnAuthorizedException('You are not authorized to view this item!');

    return Todo.createFromDetails(todo);
  }

  async findByUser(
    userId: string,
    data: {
      page: number;
      limit: number;
      isCompleted?: boolean;
      orderBy: TodoAttributes;
      sortBy: SortOrder;
    },
  ) {
    const pagination = Pagination.convertToSqlQuery(data.page, data.limit);

    const filter: TodoPartial = {};
    if (!isNil(data.isCompleted)) filter.isCompleted = data.isCompleted;

    const orderBy: TodoOrderByInput = {};
    if (data.orderBy) orderBy[data.orderBy] = data.sortBy || ASCENDING;

    const todos = await this.repository.findMany(userId, filter, pagination, orderBy);
    const totalTodos = await this.repository.count(userId, { isCompleted: data.isCompleted });

    return {
      todos: todos.map(todo => Todo.createFromDetails(todo)),
      totalTodos,
    };
  }

  async delete(userId: string, uid: string) {
    const todo = await this.repository.find({ uid });
    if (todo.userId !== userId) throw new UnAuthorizedException('You are not authorized to perform this action!');

    return await this.repository.delete(uid);
  }

  async update(uid: string, userId: string, data: TodoUpdateObject) {
    let todo = await this.repository.find({ uid });
    if (todo.userId !== userId) throw new UnAuthorizedException('You are not authorized to perform this action!');

    todo = await this.repository.update(uid, data);

    return Todo.createFromDetails(todo);
  }
}

export default TodoService;
