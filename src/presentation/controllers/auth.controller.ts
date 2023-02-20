import AuthService from '@/domain/auth/auth.service';
import { UserCredentialsDto } from '@/domain/auth/dtos/auth.dtos';
import { UserCreationDto } from '@/domain/user/dtos/user.dtos';
import UserService from '@domain/user/user.service';
import { IHandler } from '@presentation/interfaces/express';
import BaseController from './base/BaseController';

class AuthController extends BaseController {
  userService: UserService;
  authService: AuthService;

  constructor() {
    super();

    this.userService = new UserService();
    this.authService = new AuthService();
  }

  register: IHandler = async (req, res, next) => {
    const userObject: UserCreationDto = req.body;

    const user = await this.userService.register(userObject);

    res.status(201).json(user);
  };

  login: IHandler = async (req, res, next) => {
    const userCreds: UserCredentialsDto = req.body;

    const user = await this.authService.login(userCreds);

    res.status(201).json(user);
  };
}

export default AuthController;
