import AuthServices from '@Application/Services/Auth/AuthServices';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import { IHandler } from '@interfaces/index';
import BaseController from './Base/BaseController';

class AuthController extends BaseController {
  private service: AuthServices;

  constructor() {
    super();

    this.service = new AuthServices(UserRepository);
  }

  fetchGoogleAuthUrl: IHandler = async (req, res) => {
    const data = this.service.generateGoogleAuthUrl();

    res.status(200).json(HttpResponse.ok(data));
  };
}

export default AuthController;
