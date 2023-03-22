import User from '@Domain/Entities/User';
import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import { NotFoundException } from '@Infrastructure/Exceptions';
import { Inject, Service } from 'typedi';

@Service()
class UserServices {
  constructor(@Inject('user.rep.prisma') private readonly repository: IUserRepository) {}

  async findById(uid: string) {
    const dbUser = await this.repository.find({ uid });
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    return User.createFromDetails(dbUser);
  }

  async deleteUser(uid: string) {
    return await this.repository.delete(uid);
  }
}

export default UserServices;
