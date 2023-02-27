import { IPaginationQuery } from '@/application/utils/Pagination';
import { IPrismaTodo, ITodo, ITodoModel, ITodoUpdate, TodoOrderByWithRelationInput } from '../types';

export default interface ITodoRepository {
  create: (obj: ITodo) => Promise<IPrismaTodo>;
  find: (id: number) => Promise<IPrismaTodo>;
  findMany: (
    userId: number,
    pagination?: IPaginationQuery,
    where?: Partial<ITodoModel>,
    orderBy?: TodoOrderByWithRelationInput,
  ) => Promise<IPrismaTodo[]>;
  count: (userId: number, where?: Partial<ITodoModel>) => Promise<number>;
  delete: (id: number) => Promise<IPrismaTodo>;
  update: (id: number, obj: ITodoUpdate) => Promise<IPrismaTodo>;
}
