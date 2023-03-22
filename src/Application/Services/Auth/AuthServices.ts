import OAuth2 from '@Infrastructure/Auth/Google/OAuth2';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';
import configs from '@Infrastructure/Configs';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import { Inject, Service } from 'typedi';

@Service()
class AuthServices {
  constructor(@Inject() private readonly repository: UserRepository) {}

  public generateGoogleAuthUrl() {
    const oAuth2 = new OAuth2(configs.googleAuth.web);

    const url = oAuth2.generateAuthUrl();

    return { url };
  }

  public jwtStrategy() {
    return JsonWebToken.strategy(this.repository);
  }
}

export default AuthServices;
