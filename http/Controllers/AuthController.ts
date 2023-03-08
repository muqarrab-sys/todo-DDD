import commandBus from '@Application/CommandBus';
import { GenerateAuthUrlCommand } from '@Application/Services/Auth/Commands';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import { IHandler } from '@interfaces/index';

class AuthController {
  fetchGoogleAuthUrl: IHandler = async (req, res) => {
    const response = commandBus.handle(new GenerateAuthUrlCommand());

    return HttpResponse.ok(response);
  };
}

export default AuthController;
