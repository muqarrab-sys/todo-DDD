import { Prisma } from '.prisma/client';
import { IPaginationQuery } from '@Infrastructure/Utils/Pagination';
import { ITodo, TodoOrderByInput, TodoUserInput } from '@interfaces/todo';

export default interface ITodoRepository {
  create: (obj: ITodo) => Promise<ITodo>;
  find: (where: Prisma.TodoWhereUniqueInput) => Promise<ITodo>;
  findMany: (where?: Partial<ITodo>, pagination?: IPaginationQuery, orderBy?: TodoOrderByInput) => Promise<ITodo[]>;
  count: (userId: string, where?: Partial<ITodo>) => Promise<number>;
  delete: (id: string) => Promise<ITodo>;
  update: (id: string, obj: Partial<TodoUserInput>) => Promise<ITodo>;
}
