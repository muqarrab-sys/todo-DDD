import BadRequestException from '@/application/exceptions/BadRequestException';
import SignInGoogleUser from '@/application/use_cases/googleUser/SignInGoogleUser';
import LoginUser from '@/application/use_cases/user/LoginUser';
import RegisterUser from '@/application/use_cases/user/RegisterUser';
import { IUserCreationObject, IUserCredentialsObject } from '@/domain/user/types';
import configs from '@/infrastructure/auth/configs';
import OAuth2 from '@/infrastructure/auth/OAuth2';
import UserRepository from '@/infrastructure/persistence/repositories/user.repository';
import { IHandler } from '../interfaces/express';
import BaseController from './base/BaseController';

class AuthController extends BaseController {
  register: IHandler = async (req, res) => {
    const body: IUserCreationObject = req.body;

    const repository = new UserRepository();

    const useCase = new RegisterUser(repository);

    const user = await useCase.execute(body);

    res.status(201).json({ success: true, data: user.values });
  };

  login: IHandler = async (req, res) => {
    const body: IUserCredentialsObject = req.body;

    const repository = new UserRepository();

    const useCase = new LoginUser(repository);

    const data = await useCase.execute(body);

    res.status(201).json({ success: true, data });
  };

  getAuthUrl: IHandler = async (req, res) => {
    const googleClient = new OAuth2(configs.googleAuth.web);
    const url = googleClient.generateAuthUrl();

    res.status(200).json({ success: true, data: url });
  };

  googleSignIn: IHandler = async (req, res) => {
    const { code } = req.body;
    if (!code) throw new BadRequestException('Code missing!');

    const repository = new UserRepository();
    const googleClient = new OAuth2(configs.googleAuth.web);
    const useCase = new SignInGoogleUser(repository, googleClient);

    const data = await useCase.execute(code);

    res.status(200).json({ success: true, data });
  };
}

export default AuthController;
