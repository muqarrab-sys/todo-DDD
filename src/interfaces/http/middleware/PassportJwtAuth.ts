import AuthServices from '@/application/services/AuthServices';
import UserRepository from '@/infrastructure/repositories/UserRepository';
import passport from 'passport';

function PassportJwtAuth() {
  const service = new AuthServices(UserRepository);
  const JwtStrategy = service.jwtStrategy();
  passport.use('jwt', JwtStrategy);

  return passport.authenticate('jwt', { session: false });
}

export default PassportJwtAuth;
