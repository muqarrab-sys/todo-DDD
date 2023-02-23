import AuthController from '@presentation/controllers/auth.controller';
import BaseRouter from './base/BaseRouter';

class AuthRouter extends BaseRouter<AuthController> {
  constructor(path: string) {
    super(new AuthController(), path);
  }

  protected routes(): void {
    this.get('/googleUrl', this.controller.getAuthUrl);
  }
}

export default AuthRouter;
