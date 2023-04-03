import IUserRepository from '@Domain/Entities/User/IUserRepository';
import PrismaDatabase from '@Infrastructure/Database/Prisma/PrismaDatabase';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import { IUser } from '@interfaces/user';
import { Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
class UserRepository implements IUserRepository {
  private user: Prisma.UserDelegate<{}>;

  constructor(@inject(PrismaDatabase) private db: IDatabaseClient) {
    this.user = db.client.user;
  }

  async create(data: IUser) {
    return await this.user.create({ data });
  }

  async find(where) {
    return await this.user.findUnique({ where });
  }

  async update(uid: string, user: IUser) {
    return await this.user.update({
      where: { uid },
      data: {
        name: user.name,
        gender: user.gender,
        dob: user.dob,
        password: user.password,
      },
    });
  }

  async delete(uid: string) {
    return await this.user.delete({ where: { uid } });
  }
}

export default UserRepository;
