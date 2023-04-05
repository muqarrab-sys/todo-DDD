import { AuthServices } from '@Infrastructure/IoC/Containers';
import { Command } from 'simple-command-bus';

class GenerateAuthUrlHandler {
  handle(command: Command) {
    return AuthServices.generateGoogleAuthUrl();
  }
}

export default GenerateAuthUrlHandler;
