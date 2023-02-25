import { IPrismaUser, IUserModel } from '../types';

export default interface IUserRepository {
  create: (obj: IUserModel) => Promise<IPrismaUser>;
  find: (id: number) => Promise<IPrismaUser>;
  findByEmail: (email: string) => Promise<IPrismaUser>;
  // update: (id: string, obj: any) => Promise<any>;
  // delete: (id: string) => Promise<any>;
}
