import { IUserModelObject, UserDoc } from '../types';

export default interface IUserRepository {
  create: (obj: IUserModelObject) => Promise<UserDoc>;
  update: (id: string, obj: IUserModelObject) => Promise<UserDoc>;
  delete: (id: string) => Promise<UserDoc>;
  find: (id: string) => Promise<UserDoc>;
  findByEmail: (email: string) => Promise<UserDoc>;
}
