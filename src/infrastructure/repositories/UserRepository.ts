import IUserRepository from '@/domain/entities/user/repository/IUserRepository';
import { IUserModel } from '@/domain/entities/user/types';
import { Prisma } from '@prisma/client';
import PrismaDatabase from '../database/prisma/PrismaDatabase';

class UserRepository implements IUserRepository {
  private model: Prisma.UserDelegate<{}>;

  constructor() {
    this.model = new PrismaDatabase().getClient().user;
  }

  async create(data: IUserModel) {
    return await this.model.create({ data });
  }

  async find(id: number) {
    return await this.model.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.model.findUnique({ where: { email } });
  }
}

export default UserRepository;
