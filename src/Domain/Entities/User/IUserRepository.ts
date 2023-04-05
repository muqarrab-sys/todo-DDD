import { IUser, UserWhereUniqueQuery } from '@interfaces/user';

export default interface IUserRepository {
  create: (obj: Partial<IUser>) => Promise<IUser>;
  find: (where: UserWhereUniqueQuery) => Promise<IUser>;
  update: (uid: string, obj: Partial<IUser>) => Promise<IUser>;
  delete: (uid: string) => Promise<IUser>;
}
