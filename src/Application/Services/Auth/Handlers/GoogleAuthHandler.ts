import { AuthServices } from '@Infrastructure/IoC/Containers';
import { GoogleAuthCommand } from '../Commands';

class GoogleAuthHandler {
  async handle(command: GoogleAuthCommand) {
    const response = await AuthServices.authorizeWithGoogleAuth(command.code);

    return response;
  }
}

export default GoogleAuthHandler;
