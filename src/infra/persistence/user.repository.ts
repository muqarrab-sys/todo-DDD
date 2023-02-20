import { QueryOptions } from 'mongoose';
import User, { IUser } from '@domain/user/user.model';

class UserRepository {
  async create(userObj: IUser) {
    const user = new User(userObj);
    return await user.save();
  }

  async findById(id: string) {
    return await User.findById(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async update(id: string, userObj: IUser, options: QueryOptions<IUser>) {
    return await User.findByIdAndUpdate(id, userObj, options);
  }

  async delete(id: string) {
    return await User.findByIdAndDelete(id);
  }
}

export default UserRepository;
