import AuthController from '@http/Controllers/AuthController';
import BaseRouter from './Base/BaseRouter';

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
