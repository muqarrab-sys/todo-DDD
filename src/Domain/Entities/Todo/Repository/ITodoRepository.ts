import { Prisma } from '.prisma/client';
import { IPaginationQuery } from '@Application/Utils/Pagination';
import { ITodo, TodoOrderByInput, TodoPartial, TodoUpdateObject } from '@interfaces/todo';

export default interface ITodoRepository {
  create: (obj: ITodo) => Promise<ITodo>;
  find: (where: Prisma.TodoWhereUniqueInput) => Promise<ITodo>;
  findMany: (userId: string, where?: TodoPartial, pagination?: IPaginationQuery, orderBy?: TodoOrderByInput) => Promise<ITodo[]>;
  count: (userId: string, where?: TodoPartial) => Promise<number>;
  delete: (id: string) => Promise<ITodo>;
  update: (id: string, obj: TodoUpdateObject) => Promise<ITodo>;
}
