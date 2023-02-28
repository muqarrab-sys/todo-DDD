import AuthController from '@/application/controllers/AuthController';
import BaseRouter from './base/BaseRouter';

class AuthRouter extends BaseRouter<AuthController> {
  constructor() {
    super(AuthController);
  }

  protected routes(): void {
    this.get('/auth_url', this.controller.fetchGoogleAuthUrl);
  }

  protected protectedRoutes(): void {}
}

export default AuthRouter;
