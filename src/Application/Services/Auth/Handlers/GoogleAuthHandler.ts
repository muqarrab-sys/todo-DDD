import { GoogleAuthDomainService } from '@Infrastructure/IoC/Containers';
import { GoogleAuthCommand } from '../Commands';

class GoogleAuthHandler {
  async handle(command: GoogleAuthCommand) {
    const response = await GoogleAuthDomainService.authorize(command.code);

    return response;
  }
}

export default GoogleAuthHandler;
