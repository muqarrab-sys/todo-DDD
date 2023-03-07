import commandBus from '@Application/CommandBus';
import { GenerateAuthUrlCommand } from '@Application/Services/Auth/Commands';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import { IHandler } from '@interfaces/index';
import BaseController from './Base/BaseController';

class AuthController extends BaseController {
  fetchGoogleAuthUrl: IHandler = async (req, res) => {
    const response = commandBus.handle(new GenerateAuthUrlCommand());

    res.status(200).json(HttpResponse.ok(response));
  };
}

export default AuthController;
