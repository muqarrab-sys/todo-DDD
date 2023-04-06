import IUserRepository from '@Domain/Entities/User/IUserRepository';
import { User } from '@Infrastructure/Database/TypeOrm/Entities';
import TypeORMDatabase from '@Infrastructure/Database/TypeOrm/TypeORMDatabase';
import { IUser } from '@interfaces/User';
import { injectable } from 'inversify';
import { FindOptionsWhere, Repository } from 'typeorm';

@injectable()
class UserRepository implements IUserRepository {
  private repo: Repository<User>;

  constructor(db: TypeORMDatabase) {
    this.repo = db.client.getRepository(User);
  }

  async create(data: IUser) {
    return await this.repo.save(data);
  }

  async find(where: FindOptionsWhere<User>) {
    return this.repo.findOne({ where });
  }

  async update(uid: string, obj: IUser) {
    return (await this.repo.update({ uid }, obj)).raw as IUser;
  }

  async delete(uid: string) {
    return (await this.repo.delete({ uid })).raw as IUser;
  }
}

export default UserRepository;
