import { IPrismaUser, IUser, IUserModel } from '../types';

export default interface IUserRepository {
  create: (obj: IUser) => Promise<IPrismaUser>;
  find: (id: number) => Promise<IPrismaUser>;
  findByEmail: (email: string) => Promise<IPrismaUser>;
  // update: (id: string, obj: any) => Promise<any>;
  // delete: (id: string) => Promise<any>;
}
