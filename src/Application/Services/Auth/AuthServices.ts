import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import OAuth2 from '@Infrastructure/Auth/Google/OAuth2';
import configs from '@Infrastructure/Configs';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { UnAuthorizedException } from '@Infrastructure/Exceptions';
import BaseServices from '../BaseServices';
import { JwtPayload } from '@interfaces/index';

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

    return new JwtStrategy(options, async (payload: JwtPayload, done) => {
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
