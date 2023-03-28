import IUserRepository from '@Domain/Entities/User/IUserRepository';
import Configs from '@Infrastructure/Configs';
import { UnAuthorizedException } from '@Infrastructure/Exceptions';
import { JwtPayload } from '@interfaces/index';
import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';

const options: StrategyOptions = {
  secretOrKey: Configs.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

class JsonWebToken {
  static encode(data: JwtPayload) {
    const token = jwt.sign(data, options.secretOrKey);

    return `bearer ${token}`;
  }

  static decode(token: string): JwtPayload {
    const fixedToken = token.replace('bearer ', '');

    return jwt.verify(fixedToken, options.secretOrKey) as JwtPayload;
  }

  static strategy(repo: IUserRepository) {
    return new JwtStrategy(options, async (payload: JwtPayload, done) => {
      try {
        const user = await repo.find({ uid: payload.sub });
        if (!user) done(new UnAuthorizedException('Invalid User'), false);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    });
  }
}

export default JsonWebToken;
