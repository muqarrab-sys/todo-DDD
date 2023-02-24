import { UnAuthorizedException } from '@/application/exceptions';
import { IHandler } from '../interfaces/express';
import FetchUser from '@/application/use_cases/user/FetchUser';
import UserRepository from '@/infra/persistence/repositories/user.repository';
import Auth from '@/infra/auth/Auth';

const authenticationMiddleware =
  (skipFetchUser?: boolean): IHandler =>
  async (req, res, next) => {
    try {
      const token = req.headers.authorization as string;
      if (!token) throw new UnAuthorizedException('Token missing');

      const auth = new Auth();
      const decoded = auth.decodeToken(token);
      if (!decoded) throw new UnAuthorizedException('Bad token');

      if (!skipFetchUser) {
        const useCase = new FetchUser(new UserRepository());
        req.currentUser = await useCase.execute(decoded.id);
      }

      next();
    } catch (ex) {
      next(ex);
    }
  };

export default authenticationMiddleware;
