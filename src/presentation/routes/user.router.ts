import { UserCreationDto, UserCredentialsDto } from '@/domain/user/dtos/user.dtos';
import UserController from '@presentation/controllers/user.controller';
import validationMiddleware from '../middleware/validation.middleware';
import AuthorizedRouter from './base/AuthorizedRouter';

class UserRouter extends AuthorizedRouter<UserController> {
  constructor(path: string) {
    super(new UserController(), path);
  }

  protected routes(): void {}
}

export default UserRouter;
