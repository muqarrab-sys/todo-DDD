import { UnAuthorizedException } from '@/application/exceptions';
import UserServices from '@/application/services/UserServices';
import JsonWebToken from '@/infrastructure/utils/JsonWebToken';
import UserRepository from '@/infrastructure/repositories/UserRepository';
import { IHandler } from '@/interfaces';

const authorize = (): IHandler => async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) throw new UnAuthorizedException('Token missing');

    const decoded = JsonWebToken.decode(token);
    if (!decoded) throw new UnAuthorizedException('Bad token');

    const user = await new UserServices(UserRepository).findById(decoded.id);
    if (!user) throw new UnAuthorizedException('Invalid User');

    req.currentUser = user;

    next();
  } catch (ex) {
    next(ex);
  }
};

export default authorize;