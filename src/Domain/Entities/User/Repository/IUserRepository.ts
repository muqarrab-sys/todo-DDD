import { Prisma } from '.prisma/client';
import { IUser, IUserModel } from '@interfaces/user';

export default interface IUserRepository {
  create: (obj: IUser) => Promise<IUserModel>;
  find: (where: Prisma.UserWhereUniqueInput) => Promise<IUserModel>;
  findByEmail: (email: string) => Promise<IUserModel>;
  update: (uid: string, obj: IUser) => Promise<IUserModel>;
}
