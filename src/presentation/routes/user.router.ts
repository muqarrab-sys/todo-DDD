import UserController from '@presentation/controllers/user.controller';
import BaseRouter from './base/BaseRouter';

class UserRouter extends BaseRouter<UserController> {
  constructor(path: string) {
    super(new UserController(), path);
  }

  protected routes(): void {}
  protected protectedRoutes(): void {}
}

export default UserRouter;
