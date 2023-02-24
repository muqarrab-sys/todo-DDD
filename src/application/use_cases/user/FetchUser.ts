import { NotFoundException } from '@/application/exceptions';
import User from '@/domain/user';
import IUserRepository from '@/domain/user/repository/IUserRepository';

class FetchUser {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const user = await this.repository.find(id);
    if (!user) throw new NotFoundException("User doesn't exist");

    return User.create(user);
  }
}

export default FetchUser;
