import AuthController from '@http/Controllers/AuthController';
import Validate from '@http/Middleware/ValidationMiddleware';
import BaseRouter from './Base/BaseRouter';
import { GoogleCodeDto } from '@Application/Auth/Dtos';

class AuthRouter extends BaseRouter<AuthController> {
  constructor() {
    super(AuthController);
  }

  protected routes(): void {
    this.get('/authUrl', this.controller.fetchGoogleAuthUrl);
    this.post('/googleAuth', Validate(GoogleCodeDto), this.controller.googleAuth);
  }
}

export default AuthRouter;
