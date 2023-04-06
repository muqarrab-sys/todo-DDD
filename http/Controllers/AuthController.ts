import commandBus from '@Application/CommandBus';
import { GenerateAuthUrlCommand, GoogleAuthCommand } from '@Application/Auth/Commands';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import { IHandler } from '@interfaces/express/types';
import { GoogleCodeObject } from '@interfaces/User';

class AuthController {
  fetchGoogleAuthUrl: IHandler = async req => {
    const response = commandBus.handle(new GenerateAuthUrlCommand());

    return HttpResponse.ok(response);
  };

  googleAuth: IHandler = async req => {
    const data: GoogleCodeObject = req.body;

    const command = GoogleAuthCommand.create(data.code);
    const response = await commandBus.handle(command);

    return HttpResponse.ok(response);
  };
}

export default AuthController;
