import User from '@Domain/Entities/User';
import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import RegisterUserEvent from '@Domain/Events/RegisterUserEvent';
import OAuth2 from '@Infrastructure/Auth/Google/OAuth2';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';
import Configs from '@Infrastructure/Configs';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import { Inject, Service } from 'typedi';

@Service()
class GoogleAuthService {
  constructor(@Inject('user.rep.prisma') private readonly repository: UserRepository) {}

  async authorize(code: string) {
    const oAuth = new OAuth2(Configs.googleAuth.web);

    const { tokens } = await oAuth.getToken(code);
    const googleUser = await oAuth.getGoogleUser(tokens.id_token);

    let dbUser = await this.repository.find({ email: googleUser.email });
    if (!dbUser) {
      dbUser = await this.repository.create(
        User.create({
          name: googleUser.name,
          email: googleUser.email,
          password: null,
          googleId: googleUser.sub,
        }),
      );

      const event = new RegisterUserEvent();
      event.emit('registerUser', dbUser);
    }

    const user = User.createFromDetails(dbUser);
    const token = JsonWebToken.encode({ sub: user.uid });

    return { user: user.values, token };
  }
}

export default GoogleAuthService;
