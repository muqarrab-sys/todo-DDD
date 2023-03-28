import { UserCreationDto, UserCredentialsDto, UserUpdateDto, UserUpdatePasswordDto } from '@Application/Dto/UserDto';
import UserController from '@http/Controllers/UserController';
import Validate from '../Middleware/ValidationMiddleware';
import BaseRouter from './Base/BaseRouter';

class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  protected routes(): void {
    this.post('/register', Validate(UserCreationDto), this.controller.register);
    this.post('/login', Validate(UserCredentialsDto), this.controller.login);
  }

  protected protectedRoutes(): void {
    this.put('/updateProfile', Validate(UserUpdateDto, 'body', { skipMissingProperties: true }), this.controller.updateProfile);
    this.put('/updatePassword', Validate(UserUpdatePasswordDto), this.controller.updatePassword);
  }
}

export default UserRouter;
