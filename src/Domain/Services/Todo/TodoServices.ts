import Todo from '@Domain/Entities/Todo';
import ITodoRepository from '@Domain/Entities/Todo/Repository/ITodoRepository';
import { ASCENDING } from '@Infrastructure/Constants';
import { NotFoundException, UnAuthorizedException } from '@Infrastructure/Exceptions';
import Pagination from '@Infrastructure/Utils/Pagination';
import { SortOrder } from '@interfaces/index';
import { ITodo, TodoAttributes, TodoOrderByInput, TodoUserInput } from '@interfaces/todo';
import { isNil } from 'lodash';
import { Inject, Service } from 'typedi';

@Service()
class TodoService {
  constructor(@Inject('todo.repo.prisma') private readonly repository: ITodoRepository) {}

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
    data?: {
      page?: number;
      size?: number;
      isCompleted?: boolean;
      orderBy: TodoAttributes;
      sortBy: SortOrder;
    },
  ) {
    const pagination = Pagination.offsetPaginationQuery(data?.page, data?.size);

    const filter: Partial<ITodo> = {};
    filter.userId = userId;
    if (!isNil(data?.isCompleted)) filter.isCompleted = data?.isCompleted;

    const orderBy: TodoOrderByInput = {};
    if (data?.orderBy) orderBy[data?.orderBy] = data?.sortBy || ASCENDING;

    const todos = await this.repository.findMany(filter, pagination, orderBy);
    const totalTodos = await this.repository.count(userId, { isCompleted: data?.isCompleted });

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

  async update(uid: string, userId: string, data: Partial<TodoUserInput>) {
    let todo = await this.repository.find({ uid });
    if (todo.userId !== userId) throw new UnAuthorizedException('You are not authorized to perform this action!');

    todo = await this.repository.update(uid, data);

    return Todo.createFromDetails(todo);
  }
}

export default TodoService;
