import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import OAuth2 from '@Infrastructure/Auth/Google/OAuth2';
import configs from '@Infrastructure/Configs';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { UnAuthorizedException } from '@Infrastructure/Exceptions';
import BaseServices from '../BaseServices';
import { JwtPayload } from '@interfaces/index';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';

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
