import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import Configs from '@Infrastructure/Configs';
import { UnAuthorizedException } from '@Infrastructure/Exceptions';
import { JwtPayload } from '@interfaces/index';
import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';

class JsonWebToken {
  static options: StrategyOptions = {
    secretOrKey: Configs.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  static encode(data: JwtPayload) {
    const token = jwt.sign(data, JsonWebToken.options.secretOrKey);

    return `bearer ${token}`;
  }

  static decode(token: string): JwtPayload {
    const fixedToken = token.replace('bearer ', '');

    return jwt.verify(fixedToken, JsonWebToken.options.secretOrKey) as JwtPayload;
  }

  static strategy(repo: IUserRepository) {
    return new JwtStrategy(JsonWebToken.options, async (payload: JwtPayload, done) => {
      try {
        const user = await repo.find(payload.id);
        if (!user) done(new UnAuthorizedException('Invalid User'), false);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    });
  }
}

export default JsonWebToken;
