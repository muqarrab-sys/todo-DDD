import User from '@/domain/entities/user';
import { IGoogleCodeValidation, IUserCredentialsValidation, IUserValidation } from '@/domain/entities/user/types';
import UserRepository from '@/infrastructure/repositories/UserRepository';
import SharedUtils from '@/infrastructure/utils/SharedUtils';
import { IHandler } from '@/interfaces';
import UserServices from '../services/UserServices';
import HttpResponse from '../utils/HttpResponse';
import BaseController from './base/BaseController';

class UserController extends BaseController {
  private service: UserServices;

  constructor() {
    super();

    this.service = new UserServices(UserRepository);
  }

  public register: IHandler = async (req, res) => {
    const data: IUserValidation = req.body;

    const response = await this.service.registerUser(
      User.create({
        uid: SharedUtils.uuid(),
        name: data.name,
        email: data.email.value,
        password: data.password.value,
        gender: data.gender,
        dob: data.dob,
      }),
    );

    res.status(201).json(HttpResponse.ok(response, 'User Registered!'));
  };

  public login: IHandler = async (req, res) => {
    const data: IUserCredentialsValidation = req.body;

    const response = await this.service.loginUser(data.email, data.password);

    res.status(200).json(HttpResponse.ok(response));
  };

  public signInWithGoogle: IHandler = async (req, res) => {
    const data: IGoogleCodeValidation = req.body;

    const response = await this.service.registerOrLoginWithGoogle(data.code);

    res.status(200).json(HttpResponse.ok(response));
  };
}

export default UserController;
