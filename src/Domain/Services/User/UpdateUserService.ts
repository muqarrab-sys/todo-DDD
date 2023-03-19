import User from '@Domain/Entities/User';
import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import BCrypt from '@Infrastructure/Auth/Encrypt/BCrypt';
import BadRequestException from '@Infrastructure/Exceptions/BadRequestException';
import { IUser, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';
import { Inject, Service } from 'typedi';

@Service()
class UpdateUserService {
  constructor(@Inject('user.rep.prisma') private readonly repository: IUserRepository) {}

  async updateProfile(user: IUser, obj: UserUpdateObject) {
    const updatedUser = await this.repository.update(user.uid, Object.assign(user, obj));

    return User.createFromDetails(updatedUser).values;
  }

  async updatePassword(user: IUser, obj: UserUpdatePasswordObject) {
    if (obj.newPassword !== obj.confirmPassword) throw new BadRequestException("Passwords Don't match");

    const isMatch = await BCrypt.compare(obj.oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Wrong password');

    user.password = await BCrypt.encrypt(obj.newPassword);

    const updatedUser = await this.repository.update(user.uid, user);

    return User.createFromDetails(updatedUser).values;
  }
}

export default UpdateUserService;
