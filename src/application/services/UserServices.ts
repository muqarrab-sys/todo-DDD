import IUserRepository from '@/domain/entities/user/repository/IUserRepository';
import UserRepository from '@/infrastructure/repositories/UserRepository';
import BaseServices from './base/BaseServices';

class UserServices extends BaseServices<IUserRepository> {
  constructor(Repository: IUserRepository) {
    super(UserRepository);
  }

  async registerUser(obj) {}

  async loginUser(email: string, password: string) {}
}

export default UserServices;
