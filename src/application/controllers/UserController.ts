import User from '@/domain/entities/user';
import { GoogleCodeObject, UserCredentialObject, UserInputObject, UserUpdateObject, UserUpdatePasswordObject } from '@/domain/entities/user/types';
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
    const data: UserInputObject = req.body;

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
    const data: UserCredentialObject = req.body;

    const response = await this.service.loginUser(data.email, data.password);

    res.status(200).json(HttpResponse.ok(response));
  };

  public signInWithGoogle: IHandler = async (req, res) => {
    const data: GoogleCodeObject = req.body;

    const response = await this.service.registerOrLoginWithGoogle(data.code);

    res.status(200).json(HttpResponse.ok(response));
  };

  public updateProfile: IHandler = async (req, res) => {
    const body: UserUpdateObject = req.body;

    const response = await this.service.updateProfile(req.currentUser, body);

    res.status(200).json(HttpResponse.ok(response, 'User Profile Updated!'));
  };

  public updatePassword: IHandler = async (req, res) => {
    const body: UserUpdatePasswordObject = req.body;

    const response = await this.service.updatePassword(req.currentUser, body);

    res.status(200).json(HttpResponse.ok(response, 'Password updated!'));
  };
}

export default UserController;
