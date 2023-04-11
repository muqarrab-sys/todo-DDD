import { IPaginationQuery, WhereUniqueQuery } from '@interfaces/IQuery';
import IRepository from '@interfaces/IRepository';
import { ITodo, TodoOrderByInput, TodoUserInput } from '@interfaces/Todo';

export default interface ITodoRepository extends IRepository<ITodo> {
  find: (where: WhereUniqueQuery) => Promise<ITodo>;
  findMany: (where?: Partial<ITodo>, pagination?: IPaginationQuery, orderBy?: TodoOrderByInput) => Promise<{ todos: ITodo[]; count: number }>;
}
