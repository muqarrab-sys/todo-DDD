import { Prisma } from '.prisma/client';
import { IUser } from '@interfaces/user';

export default interface IUserRepository {
  create: (obj: IUser) => Promise<IUser>;
  find: (where: Prisma.UserWhereUniqueInput) => Promise<IUser>;
  update: (uid: string, obj: IUser) => Promise<IUser>;
}
