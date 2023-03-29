import User from '@Domain/Entities/User';
import RegisterUserEvent from '@Application/Events/RegisterUserEvent';
import OAuth2 from '@Infrastructure/Auth/Google/OAuth2';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';
import Configs from '@Infrastructure/Configs';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import { Inject, Service } from 'typedi';

@Service()
class AuthServices {
  constructor(@Inject() private readonly repository: UserRepository) {}

  public generateGoogleAuthUrl() {
    const oAuth2 = new OAuth2(Configs.googleAuth.web);

    const url = oAuth2.generateAuthUrl();

    return { url };
  }

  public jwtStrategy() {
    return JsonWebToken.strategy(this.repository);
  }

  async authorizeWithGoogleAuth(code: string) {
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

export default AuthServices;
