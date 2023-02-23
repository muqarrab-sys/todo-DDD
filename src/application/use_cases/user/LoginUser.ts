import User from '@/domain/user';
import IUserRepository from '@/domain/user/repository/IUserRepository';
import { IUserCredentialsObject } from '@/domain/user/types';

class LoginUser {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(credentials: IUserCredentialsObject) {
    const user = await this.repository.findByEmail(credentials.email.value);
    if (!user) throw new Error("User doesn't exist");

    const isMatch = await credentials.password.compare(user.password);
    if (!isMatch) throw new Error('Wrong password');

    return User.create(user);
  }
}

export default LoginUser;
