import AuthController from '@presentation/controllers/auth.controller';
import BaseRouter from './base/BaseRouter';

class AuthRouter extends BaseRouter<AuthController> {
  constructor(path: string) {
    super(new AuthController(), path);
  }

  protected routes(): void {}
}

export default AuthRouter;
