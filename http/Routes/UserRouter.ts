import {
  UserCreationValidation,
  UserCredentialsValidation,
  UserUpdatePasswordValidation,
  UserUpdateValidation,
} from '@Domain/Validations/UserValidations';
import UserController from '@http/Controllers/UserController';
import Validate from '../Middleware/ValidationMiddleware';
import BaseRouter from './Base/BaseRouter';

class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  protected routes(): void {
    this.post('/register', Validate(UserCreationValidation), this.controller.register);
    this.post('/login', Validate(UserCredentialsValidation), this.controller.login);
  }

  protected protectedRoutes(): void {
    this.put('/updateProfile', Validate(UserUpdateValidation, 'body', { skipMissingProperties: true }), this.controller.updateProfile);
    this.put('/updatePassword', Validate(UserUpdatePasswordValidation), this.controller.updatePassword);
  }
}

export default UserRouter;
