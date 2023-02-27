import IUserRepository from '@/domain/entities/user/repository/IUserRepository';
import { IUser } from '@/domain/entities/user/types';
import { Prisma } from '@prisma/client';
import PrismaDatabase from '../database/prisma/PrismaDatabase';

class UserRepository implements IUserRepository {
  private model: Prisma.UserDelegate<{}>;

  constructor() {
    this.model = new PrismaDatabase().getClient().user;
  }

  async create(data: IUser) {
    return await this.model.create({
      data: {
        uid: data.uid,
        name: data.name,
        email: data.email.value,
        password: data.password?.encodedValue,
        gender: data.gender,
        dob: data.dob,
        googleId: data.googleId,
      },
    });
  }

  async find(id: number) {
    return await this.model.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.model.findUnique({ where: { email } });
  }
}

export default UserRepository;
