import { IUserModel } from '@/domain/user/types';
import User from '@infra/persistence/models/user.model';
import { QueryOptions } from 'mongoose';

class UserRepository {
  async create(userObj: IUserModel) {
    const user = new User(userObj);
    return await user.save();
  }

  async findById(id: string) {
    return await User.findById(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async update(id: string, userObj: IUserModel, options: QueryOptions<IUserModel>) {
    return await User.findByIdAndUpdate(id, userObj, options);
  }

  async delete(id: string) {
    return await User.findByIdAndDelete(id);
  }
}

export default UserRepository;
