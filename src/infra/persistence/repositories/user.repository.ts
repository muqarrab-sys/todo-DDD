import { IUserModel } from '@/domain/user/types';
import User from '@infra/persistence/models/user.model';
import { QueryOptions } from 'mongoose';
import BaseRepository from './base/BaseRepository';

class UserRepository extends BaseRepository<IUserModel> {
  constructor() {
    super(User);
  }

  async create(obj: IUserModel) {
    const user = new this.model(obj);
    return await user.save();
  }

  async find(id: string) {
    return await this.model.findById(id);
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email });
  }

  async update(id: string, obj: IUserModel, options: QueryOptions<IUserModel>) {
    return await this.model.findByIdAndUpdate(id, obj, options);
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default UserRepository;
