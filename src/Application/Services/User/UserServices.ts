import User from '@Domain/Entities/User';
import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import { IUser, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';
import Email from '@Domain/ValueObjects/Email';
import Password from '@Domain/ValueObjects/Password';
import OAuth2 from '@Infrastructure/Auth/Google/OAuth2';
import configs from '@Infrastructure/Configs';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';
import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { NotFoundException, UnAuthorizedException } from '@Infrastructure/Exceptions';
import BadRequestException from '@Infrastructure/Exceptions/BadRequestException';
import BaseServices from '../BaseServices';

class UserServices extends BaseServices<IUserRepository> {
  constructor(Repository: { new (): IUserRepository }) {
    super(Repository);
  }

  async registerUser(data: IUser) {
    let dbUser = await this.repository.findByEmail(data.email.value);
    if (dbUser) throw new BadRequestException('User already registered!');

    await data.password.encode();

    dbUser = await this.repository.create(data);

    const user = User.createFromDetails(dbUser);
    const token = JsonWebToken.encode({ id: user.id, uid: user.uid });

    return { user: user.values, token };
  }

  async loginUser(email: Email, password: Password) {
    const dbUser = await this.repository.findByEmail(email.value);
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    if (dbUser.googleId) throw new UnAuthorizedException('This account can only be logged in through google');

    const isMatch = await password.compare(dbUser.password);
    if (!isMatch) throw new BadRequestException('Wrong Password!');

    const token = JsonWebToken.encode({ id: dbUser.id, uid: dbUser.uid });

    const user = User.createFromDetails(dbUser);

    return { user: user.values, token };
  }

  async registerOrLoginWithGoogle(code: string) {
    const oAuth = new OAuth2(configs.googleAuth.web);

    const { tokens } = await oAuth.getToken(code);
    const googleUser = await oAuth.getGoogleUser(tokens.id_token);

    let dbUser = await this.repository.findByEmail(googleUser.email);
    if (!dbUser) {
      dbUser = await this.repository.create(
        User.create({
          uid: SharedUtils.uuid(),
          name: googleUser.name,
          email: googleUser.email,
          password: null,
          googleId: googleUser.sub,
        }),
      );
    }

    const user = User.createFromDetails(dbUser);
    const token = JsonWebToken.encode({ id: user.id, uid: user.uid });

    return { user: user.values, token };
  }

  async findById(id: number) {
    const dbUser = await this.repository.find(id);
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    return User.createFromDetails(dbUser);
  }

  async updateProfile(user: IUser, obj: UserUpdateObject) {
    const updatedUser = await this.repository.update(user.id, Object.assign(user, obj));

    return User.createFromDetails(updatedUser).values;
  }

  async updatePassword(user: IUser, obj: UserUpdatePasswordObject) {
    if (obj.newPassword.value !== obj.confirmPassword.value) throw new BadRequestException("Passwords Don't match");

    const isMatch = await obj.oldPassword.compare(user.password.value);
    if (!isMatch) throw new BadRequestException('Wrong password');

    user.password = obj.newPassword;
    await user.password.encode();

    const updatedUser = await this.repository.update(user.id, user);

    return User.createFromDetails(updatedUser).values;
  }
}

export default UserServices;
