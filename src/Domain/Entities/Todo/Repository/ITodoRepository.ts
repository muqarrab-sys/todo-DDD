import { IPaginationQuery } from '@Application/Utils/Pagination';
import { ITodo, TodoOrderByInput, TodoPartial, TodoUpdateObject } from '@interfaces/todo';

export default interface ITodoRepository {
  create: (obj: ITodo) => Promise<ITodo>;
  find: (id: number) => Promise<ITodo>;
  findMany: (userId: number, pagination?: IPaginationQuery, where?: TodoPartial, orderBy?: TodoOrderByInput) => Promise<ITodo[]>;
  count: (userId: number, where?: TodoPartial) => Promise<number>;
  delete: (id: number) => Promise<ITodo>;
  update: (id: number, obj: TodoUpdateObject) => Promise<ITodo>;
}
