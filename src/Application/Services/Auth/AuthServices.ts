import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import OAuth2 from '@Infrastructure/Auth/Google/OAuth2';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';
import configs from '@Infrastructure/Configs';
import BaseServices from '../../Base/BaseServices';

class AuthServices extends BaseServices<IUserRepository> {
  constructor(Repository: { new (): IUserRepository }) {
    super(Repository);
  }

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
