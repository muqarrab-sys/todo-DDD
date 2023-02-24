import IUserRepository from '@/domain/user/repository/IUserRepository';
import { IUserModelObject } from '@/domain/user/types';
import UserModel from '@infra/persistence/models/user.model';
import { v4 as uuidv4 } from 'uuid';

class UserRepository implements IUserRepository {
  async create(obj: IUserModelObject) {
    obj._id = uuidv4();
    const user = new UserModel(obj);
    return await user.save();
  }

  async find(id: string) {
    return await UserModel.findById(id);
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async update(id: string, obj: IUserModelObject) {
    return await UserModel.findByIdAndUpdate(id, obj);
  }

  async delete(id: string) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default UserRepository;
