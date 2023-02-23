import { NotFoundException } from '@/application/exceptions';
import BadRequestException from '@/application/exceptions/BadRequestException';
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
    if (!user) throw new NotFoundException("User doesn't exist");

    const isMatch = await credentials.password.compare(user.password);
    if (!isMatch) throw new BadRequestException('Wrong password');

    return User.create(user);
  }
}

export default LoginUser;
