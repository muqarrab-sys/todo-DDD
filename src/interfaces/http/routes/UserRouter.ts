import UserController from '@/application/controllers/UserController';
import { UserCreationValidation, UserCredentialsValidation } from '@/domain/entities/user/validations/UserValidations';
import validate from '../middleware/validationMiddleware';
import BaseRouter from './base/BaseRouter';

class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  protected routes(): void {
    this.post('/register', validate(UserCreationValidation), this.controller.register);
    this.post('/login', validate(UserCredentialsValidation), this.controller.login);
  }

  protected protectedRoutes(): void {}
}

export default UserRouter;
