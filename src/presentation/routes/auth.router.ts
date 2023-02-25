import { UserCreationDto, UserCredentialsDto } from '@/domain/user/dtos/user.dtos';
import AuthController from '@presentation/controllers/auth.controller';
import validationMiddleware from '../../interfaces/http/middleware/validationMiddleware';
import BaseRouter from './base/BaseRouter';

class AuthRouter extends BaseRouter<AuthController> {
  constructor(path: string) {
    super(new AuthController(), path);
  }

  protected routes(): void {
    this.post('/register', validationMiddleware(UserCreationDto), this.controller.register);
    this.post('/login', validationMiddleware(UserCredentialsDto), this.controller.login);
    this.get('/googleUrl', this.controller.getAuthUrl);
    this.post('/google_sign_in', this.controller.googleSignIn);
  }

  protected protectedRoutes(): void {}
}

export default AuthRouter;
