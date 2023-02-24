import { ITodoModelObject, TodoDoc } from '../types';

export default interface ITodoRepository {
  create: (obj: ITodoModelObject) => Promise<TodoDoc>;
  update: (id: string, obj: ITodoModelObject) => Promise<TodoDoc>;
  delete: (id: string) => Promise<TodoDoc>;
  find: (id: string) => Promise<TodoDoc>;
  search: (userId: string) => Promise<TodoDoc[]>;
  paginatedSearch: (userId: string, page: number, limit: number) => Promise<TodoDoc[]>;
}
