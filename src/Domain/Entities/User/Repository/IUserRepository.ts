import { IUser, IUserModel } from '@interfaces/user';

export default interface IUserRepository {
  create: (obj: IUser) => Promise<IUserModel>;
  find: (id: number) => Promise<IUserModel>;
  findByEmail: (email: string) => Promise<IUserModel>;
  update: (id: number, obj: IUser) => Promise<IUserModel>;
}
