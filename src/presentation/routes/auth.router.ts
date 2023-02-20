import { UserCredentialsDto } from '@/domain/auth/dtos/auth.dtos';
import { UserCreationDto } from '@/domain/user/dtos/user.dtos';
import AuthController from '@presentation/controllers/auth.controller';
import validationMiddleware from '../middleware/validation.middleware';
import BaseRouter from './BaseRouter';

class AuthRouter extends BaseRouter<AuthController> {
  constructor(path: string) {
    super(new AuthController(), path);
  }

  protected routes(): void {
    this.post('/register', validationMiddleware(UserCreationDto), this.controller.register);
    this.post('/login', validationMiddleware(UserCredentialsDto), this.controller.login);
  }
}

export default AuthRouter;
