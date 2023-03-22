import { Command } from 'simple-command-bus';
import Container from 'typedi';
import AuthServices from '../AuthServices';

class GenerateAuthUrlHandler {
  handle(command: Command) {
    const service = Container.get(AuthServices);

    return service.generateGoogleAuthUrl();
  }
}

export default GenerateAuthUrlHandler;
