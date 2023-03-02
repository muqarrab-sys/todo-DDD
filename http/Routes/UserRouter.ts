import UserController from '@http/Controllers/UserController';
import {
  GoogleCodeValidation,
  UserCreationValidation,
  UserCredentialsValidation,
  UserUpdatePasswordValidation,
  UserUpdateValidation,
} from '@Domain/Validations/UserValidations';
import validate from '../Middleware/validationMiddleware';
import BaseRouter from './Base/BaseRouter';

class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  protected routes(): void {
    this.post('/register', validate(UserCreationValidation), this.controller.register);
    this.post('/login', validate(UserCredentialsValidation), this.controller.login);
    this.post('/googleSignIn', validate(GoogleCodeValidation), this.controller.signInWithGoogle);
  }

  protected protectedRoutes(): void {
    this.put('/updateProfile', validate(UserUpdateValidation, 'body', { skipMissingProperties: true }), this.controller.updateProfile);
    this.put('/updatePassword', validate(UserUpdatePasswordValidation), this.controller.updatePassword);
  }
}

export default UserRouter;
