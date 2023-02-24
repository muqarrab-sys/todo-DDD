import { ITodoCreationObject, TodoDoc } from '../types';

export default interface ITodoRepository {
  create: (obj: ITodoCreationObject) => Promise<TodoDoc>;
  update: (id: string, obj: ITodoCreationObject) => Promise<TodoDoc>;
  delete: (id: string) => Promise<TodoDoc>;
  find: (id: string) => Promise<TodoDoc>;
  search: (userId: string) => Promise<TodoDoc[]>;
  paginatedSearch: (userId: string, page: number, limit: number) => Promise<TodoDoc[]>;
}
