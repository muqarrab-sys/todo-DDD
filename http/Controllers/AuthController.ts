import { GenerateAuthUrlCommand, GoogleAuthCommand } from '@Application/Auth/Commands';
import commandBus from '@Application/CommandBus';
import { GoogleCodeObject } from '@interfaces/User';
import { IHandler } from '@interfaces/express/types';
import BaseController from './Base/BaseController';

class AuthController extends BaseController {
  fetchGoogleAuthUrl: IHandler = async req => {
    const response = commandBus.handle(new GenerateAuthUrlCommand());

    return this.ok(response);
  };

  googleAuth: IHandler = async req => {
    const data: GoogleCodeObject = req.body;

    const command = GoogleAuthCommand.create(data.code);
    const response = await commandBus.handle(command);

    return this.ok(response);
  };
}

export default AuthController;
