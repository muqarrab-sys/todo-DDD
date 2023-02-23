import { ITodoModelObject, TodoDoc } from '../types';

export default interface ITodoRepository {
  create: (obj: ITodoModelObject) => Promise<TodoDoc>;
  update: (id: string, obj: ITodoModelObject) => Promise<TodoDoc>;
  delete: (id: string) => Promise<TodoDoc>;
  find: (id: string) => Promise<TodoDoc>;
  searchByUserId: (userId: string) => Promise<TodoDoc[]>;
}
