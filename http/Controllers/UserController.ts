import UserServices from '@Application/Services/User/UserServices';
import HttpResponse from '@Application/Utils/HttpResponse';
import User from '@Domain/Entities/User';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { IHandler } from '@interfaces/index';
import { GoogleCodeObject, UserCredentialObject, UserInputObject, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';
import BaseController from './Base/BaseController';

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
        name: data.name,
        email: data.email,
        password: data.password,
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

    const response = await this.service.updateProfile(req.user, body);

    res.status(200).json(HttpResponse.ok(response, 'User Profile Updated!'));
  };

  public updatePassword: IHandler = async (req, res) => {
    const body: UserUpdatePasswordObject = req.body;

    const response = await this.service.updatePassword(req.user, body);

    res.status(200).json(HttpResponse.ok(response, 'Password updated!'));
  };
}

export default UserController;
