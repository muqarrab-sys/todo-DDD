import AuthServices from '@Application/Services/Auth/AuthServices';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import passport from 'passport';

function PassportJwtAuth() {
  const service = new AuthServices(UserRepository);
  const JwtStrategy = service.jwtStrategy();
  passport.use('jwt', JwtStrategy);

  return passport.authenticate('jwt', { session: false });
}

export default PassportJwtAuth;
