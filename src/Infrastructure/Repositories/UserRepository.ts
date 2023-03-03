import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import { IUser } from '@interfaces/user';
import { Prisma } from '@prisma/client';
import PrismaDatabase from '../Database/Prisma/PrismaDatabase';

class UserRepository implements IUserRepository {
  private user: Prisma.UserDelegate<{}>;

  constructor() {
    this.user = new PrismaDatabase().getClient().user;
  }

  async create(data: IUser) {
    return await this.user.create({ data });
  }

  async find(where) {
    return await this.user.findUnique({ where });
  }

  async findByEmail(email: string) {
    return await this.user.findUnique({ where: { email } });
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
}

export default UserRepository;
