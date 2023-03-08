import UserServices from '@Application/Services/User/UserServices';
import User from '@Domain/Entities/User';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import { IHandler } from '@interfaces/index';
import { GoogleCodeObject, UserCredentialObject, UserInputObject, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';
import Container from 'typedi';

class UserController {
  private service: UserServices;

  constructor() {
    this.service = Container.get(UserServices);
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

    return HttpResponse.created(response, 'User Registered!');
  };

  public login: IHandler = async (req, res) => {
    const data: UserCredentialObject = req.body;

    const response = await this.service.loginUser(data.email, data.password);

    return HttpResponse.ok(response);
  };

  public signInWithGoogle: IHandler = async (req, res) => {
    const data: GoogleCodeObject = req.body;

    const response = await this.service.registerOrLoginWithGoogle(data.code);

    return HttpResponse.ok(response);
  };

  public updateProfile: IHandler = async (req, res) => {
    const body: UserUpdateObject = req.body;

    const response = await this.service.updateProfile(req.user, body);

    return HttpResponse.ok(response, 'User Profile Updated!');
  };

  public updatePassword: IHandler = async (req, res) => {
    const body: UserUpdatePasswordObject = req.body;

    const response = await this.service.updatePassword(req.user, body);

    return HttpResponse.ok(response, 'Password updated!');
  };
}

export default UserController;
