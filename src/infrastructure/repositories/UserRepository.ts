import IUserRepository from '@/domain/entities/user/repository/IUserRepository';
import { IUser } from '@/domain/entities/user/types';
import { Prisma } from '@prisma/client';
import PrismaDatabase from '../database/prisma/PrismaDatabase';

class UserRepository implements IUserRepository {
  private user: Prisma.UserDelegate<{}>;

  constructor() {
    this.user = new PrismaDatabase().getClient().user;
  }

  async create(data: IUser) {
    return await this.user.create({
      data: {
        uid: data.uid,
        name: data.name,
        email: data.email.value,
        password: data.password?.encoded,
        gender: data.gender,
        dob: data.dob,
        googleId: data.googleId,
      },
    });
  }

  async find(id: number) {
    return await this.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.user.findUnique({ where: { email } });
  }

  async update(id: number, user: IUser) {
    return await this.user.update({
      where: { id },
      data: {
        name: user.name,
        gender: user.gender,
        dob: user.dob,
        password: user.password?.encoded,
      },
    });
  }
}

export default UserRepository;
