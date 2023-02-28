import { IUser, IUserModel } from '../types';

export default interface IUserRepository {
  create: (obj: IUser) => Promise<IUserModel>;
  find: (id: number) => Promise<IUserModel>;
  findByEmail: (email: string) => Promise<IUserModel>;
  update: (id: number, obj: IUser) => Promise<IUserModel>;
}
