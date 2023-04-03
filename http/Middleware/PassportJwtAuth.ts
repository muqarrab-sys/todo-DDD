import { AuthServices } from '@Infrastructure/IoC/Containers';
import passport from 'passport';

function PassportJwtAuth() {
  const JwtStrategy = AuthServices.jwtStrategy();
  passport.use('jwt', JwtStrategy);

  return passport.authenticate('jwt', { session: false });
}

export default PassportJwtAuth;
