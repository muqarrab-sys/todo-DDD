import { GoogleCodeValidation } from '@Domain/Validations/UserValidations';
import AuthController from '@http/Controllers/AuthController';
import Validate from '@http/Middleware/ValidationMiddleware';
import BaseRouter from './Base/BaseRouter';

class AuthRouter extends BaseRouter<AuthController> {
  constructor() {
    super(AuthController);
  }

  protected routes(): void {
    this.get('/authUrl', this.controller.fetchGoogleAuthUrl);
    this.post('/googleAuth', Validate(GoogleCodeValidation), this.controller.googleAuth);
  }

  protected protectedRoutes(): void {}
}

export default AuthRouter;
