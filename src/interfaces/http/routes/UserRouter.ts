import UserController from '@/application/controllers/UserController';
import {
  GoogleCodeValidation,
  UserCreationValidation,
  UserCredentialsValidation,
  UserUpdatePasswordValidation,
  UserUpdateValidation,
} from '@/domain/entities/user/validations/UserValidations';
import validate from '../middleware/validationMiddleware';
import BaseRouter from './base/BaseRouter';

class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  protected routes(): void {
    this.post('/register', validate(UserCreationValidation), this.controller.register);
    this.post('/login', validate(UserCredentialsValidation), this.controller.login);
    this.post('/google_sign_in', validate(GoogleCodeValidation), this.controller.signInWithGoogle);
  }

  protected protectedRoutes(): void {
    this.put('/update_profile', validate(UserUpdateValidation, 'body', { skipMissingProperties: true }), this.controller.updateProfile);
    this.put('/update_password', validate(UserUpdatePasswordValidation), this.controller.updatePassword);
  }
}

export default UserRouter;
