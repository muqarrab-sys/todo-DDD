import { AuthServices } from '@Infrastructure/IoC/Containers';
import passport from 'passport';

function JwtAuth() {
  const JwtStrategy = AuthServices.jwtStrategy();
  passport.use('jwt', JwtStrategy);

  return passport.authenticate('jwt', { session: false });
}

export default JwtAuth;
