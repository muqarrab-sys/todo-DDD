import { UserCredentialsDto } from '@/domain/user/dtos/user.dtos';
import { IUserCreation } from '@/domain/user/types';
import UserFactory from '@/domain/user/UserFactory';
import { IHandler } from '../interfaces/express';
import BaseController from './base/BaseController';

class UserController extends BaseController {
  private factory: UserFactory;

  constructor() {
    super();

    this.factory = new UserFactory();
  }

  register: IHandler = async (req, res) => {
    const userObj: IUserCreation = req.body;

    const user = await this.factory.create(userObj);

    res.status(201).json({ success: true, data: user.values });
  };

  login: IHandler = async (req, res, next) => {
    const userCreds: UserCredentialsDto = req.body;

    const user = await this.factory.loadByLogin(userCreds);

    res.status(200).json({ success: true, data: user.values });
  };

  signUpWithGoogle: IHandler = async (req, res) => {
    const { code } = req.body;

    if (!code) throw new Error('Code missing!');

    const user = await this.factory.createGoogleUser(code);

    res.status(201).json({ success: true, data: user.values });
  };

  signInWithGoogle: IHandler = async (req, res) => {
    const { code } = req.body;

    if (!code) throw new Error('Code missing!');

    const user = await this.factory.loadGoogleUser(code);

    res.status(200).json({ success: true, data: user.values });
  };
}

export default UserController;
