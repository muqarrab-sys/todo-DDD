import IRepository from '@interfaces/IRepository';
import { IUser, UserWhereUniqueQuery } from '@interfaces/User';

export default interface IUserRepository extends IRepository<IUser> {
  find: (where: UserWhereUniqueQuery) => Promise<IUser>;
}
