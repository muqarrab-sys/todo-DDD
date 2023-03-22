import AuthServices from '@Application/Services/Auth/AuthServices';
import passport from 'passport';
import Container from 'typedi';

function PassportJwtAuth() {
  const service = Container.get(AuthServices);
  const JwtStrategy = service.jwtStrategy();
  passport.use('jwt', JwtStrategy);

  return passport.authenticate('jwt', { session: false });
}

export default PassportJwtAuth;
