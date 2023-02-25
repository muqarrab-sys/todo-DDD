import { IPrismaTodo, ITodoModel } from '../types';

export default interface ITodoRepository {
  create: (obj: ITodoModel) => Promise<IPrismaTodo>;
  // update: (id: string, obj: any) => Promise<any>;
  // delete: (id: string) => Promise<any>;
  // find: (id: string) => Promise<any>;
  // search: (userId: string) => Promise<any[]>;
  // paginatedSearch: (userId: string, page: number, limit: number) => Promise<any[]>;
}
