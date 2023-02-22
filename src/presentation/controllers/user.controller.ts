import { UserCredentialsDto } from '@/domain/user/dtos/user.dtos';
import { IUserCreation } from '@/domain/user/types';
import UserService from '@/domain/user/user.service';
import UserFactory from '@/domain/user/UserFactory';
import { IHandler } from '../interfaces/express';
import BaseController from './base/BaseController';

class UserController extends BaseController {
  private factory: UserFactory;
  private service: UserService;

  constructor() {
    super();

    this.factory = new UserFactory();
    this.service = new UserService();
  }

  register: IHandler = async (req, res) => {
    const userObj: IUserCreation = req.body;

    const user = await this.service.register(userObj);

    res.status(201).json(user);
  };

  login: IHandler = async (req, res, next) => {
    const userCreds: UserCredentialsDto = req.body;

    const user = await this.service.login(userCreds);

    res.status(200).json(user);
  };
}

export default UserController;
