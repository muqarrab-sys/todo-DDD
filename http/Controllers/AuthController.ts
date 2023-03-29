import commandBus from '@Application/CommandBus';
import { GenerateAuthUrlCommand, GoogleAuthCommand } from '@Application/Services/Auth/Commands';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import { IHandler } from '@interfaces/index';
import { GoogleCodeObject } from '@interfaces/user';

class AuthController {
  fetchGoogleAuthUrl: IHandler = async (req, res) => {
    const response = commandBus.handle(new GenerateAuthUrlCommand());

    return HttpResponse.ok(response);
  };

  googleAuth: IHandler = async (req, res) => {
    const data: GoogleCodeObject = req.body;

    const command = GoogleAuthCommand.create(data.code);
    const response = await commandBus.handle(command);

    return HttpResponse.ok(response);
  };
}

export default AuthController;