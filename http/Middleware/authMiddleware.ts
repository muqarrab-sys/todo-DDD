import { UnAuthorizedException } from '@Infrastructure/Exceptions';
import UserServices from '@Application/Services/User/UserServices';
import JsonWebToken from '@Infrastructure/Auth/JWT/JsonWebToken';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import { IHandler } from '@interfaces/index';

const authorize = (): IHandler => async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) throw new UnAuthorizedException('Token missing');

    const decoded = JsonWebToken.decode(token);
    if (!decoded) throw new UnAuthorizedException('Bad token');

    const user = await new UserServices(UserRepository).findById(decoded.id);
    if (!user) throw new UnAuthorizedException('Invalid User');

    req.user = user;

    next();
  } catch (ex) {
    next(ex);
  }
};

export default authorize;
