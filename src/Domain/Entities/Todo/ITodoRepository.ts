import { IPaginationQuery, WhereUniqueQuery } from '@interfaces/IQuery';
import { ITodo, TodoOrderByInput, TodoUserInput } from '@interfaces/Todo';

export default interface ITodoRepository {
  create: (obj: ITodo) => Promise<ITodo>;
  find: (where: WhereUniqueQuery) => Promise<ITodo>;
  findMany: (where?: Partial<ITodo>, pagination?: IPaginationQuery, orderBy?: TodoOrderByInput) => Promise<{ todos: ITodo[]; count: number }>;
  count: (where?: Partial<ITodo>) => Promise<number>;
  delete: (id: string) => Promise<ITodo>;
  update: (id: string, obj: Partial<TodoUserInput>) => Promise<ITodo>;
}
