import AuthService from '@/domain/auth/auth.service';
import { IHandler } from '../interfaces/express';
import BaseController from './base/BaseController';

class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();

    this.authService = new AuthService();
  }

  getAuthUrl: IHandler = async (req, res) => {
    const url = this.authService.getAuthUrl();

    res.status(200).json({ success: true, data: url });
  };
}

export default AuthController;
