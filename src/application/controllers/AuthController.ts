import UserRepository from '@/infrastructure/repositories/UserRepository';
import { IHandler } from '@/interfaces';
import AuthServices from '../services/AuthServices';
import HttpResponse from '../utils/HttpResponse';
import BaseController from './base/BaseController';

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
