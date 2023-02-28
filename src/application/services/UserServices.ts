import User from '@/domain/entities/user';
import IUserRepository from '@/domain/entities/user/repository/IUserRepository';
import { IUser } from '@/domain/entities/user/types';
import Email from '@/domain/ValueObjects/Email';
import Password from '@/domain/ValueObjects/Password';
import OAuth2 from '@/infrastructure/auth/google/OAuth2';
import configs from '@/infrastructure/configs';
import JsonWebToken from '@/infrastructure/utils/JsonWebToken';
import SharedUtils from '@/infrastructure/utils/SharedUtils';
import { NotFoundException } from '../exceptions';
import BadRequestException from '../exceptions/BadRequestException';
import BaseServices from './base/BaseServices';

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

    return { user, token };
  }

  async loginUser(email: Email, password: Password) {
    const dbUser = await this.repository.findByEmail(email.value);
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    const isMatch = await password.compare(dbUser.password);
    if (!isMatch) throw new BadRequestException('Wrong Password!');

    const token = JsonWebToken.encode({ id: dbUser.id, uid: dbUser.uid });

    const user = User.createFromDetails(dbUser);

    return { user, token };
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

    return { user, token };
  }

  async findById(id: number) {
    const dbUser = await this.repository.find(id);
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    return User.createFromDetails(dbUser);
  }
}

export default UserServices;
