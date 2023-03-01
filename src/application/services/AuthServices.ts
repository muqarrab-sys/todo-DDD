import IUserRepository from '@/domain/entities/user/repository/IUserRepository';
import OAuth2 from '@/infrastructure/auth/google/OAuth2';
import configs from '@/infrastructure/configs';
import { IJwtPayload } from '@/infrastructure/utils/JsonWebToken';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { UnAuthorizedException } from '../exceptions';
import BaseServices from './base/BaseServices';

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
    const options: StrategyOptions = {
      secretOrKey: configs.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    return new JwtStrategy(options, async (payload: IJwtPayload, done) => {
      try {
        const user = await this.repository.find(payload.id);
        if (!user) done(new UnAuthorizedException('Invalid User'), false);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    });
  }
}

export default AuthServices;
