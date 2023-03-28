import User from '@Domain/Entities/User';
import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import BCrypt from '@Infrastructure/Auth/Encrypt/BCrypt';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';
import { NotFoundException, UnAuthorizedException } from '@Infrastructure/Exceptions';
import BadRequestException from '@Infrastructure/Exceptions/BadRequestException';
import { IUser, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';
import { Inject, Service } from 'typedi';

@Service()
class UserServices {
  constructor(@Inject('user.rep.prisma') private readonly repository: IUserRepository) {}

  async register(data: IUser) {
    let dbUser = await this.repository.find({ email: data.email });
    if (dbUser) throw new BadRequestException('User already registered!');

    data.password = await BCrypt.encrypt(data.password);

    dbUser = await this.repository.create(data);

    const user = User.createFromDetails(dbUser);
    const token = JsonWebToken.encode({ sub: user.uid });

    return { user: user.values, token };
  }

  async login(email: string, password: string) {
    const dbUser = await this.repository.find({ email });
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    if (dbUser.googleId) throw new UnAuthorizedException('This account can only be logged in through google');

    const isMatch = await BCrypt.compare(password, dbUser.password);
    if (!isMatch) throw new BadRequestException('Wrong Password!');

    const user = User.createFromDetails(dbUser);
    const token = JsonWebToken.encode({ sub: user.uid });

    return { user: user.values, token };
  }

  async findById(uid: string) {
    const dbUser = await this.repository.find({ uid });
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    return User.createFromDetails(dbUser);
  }

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

  async deleteUser(uid: string) {
    return await this.repository.delete(uid);
  }
}

export default UserServices;
