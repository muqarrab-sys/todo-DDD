import { LoginDomainService } from '@Infrastructure/IoC/Containers';
import { LoginCommand } from '../Commands';

class LoginHandler {
  async handle(command: LoginCommand) {
    const response = await LoginDomainService.login(command.email, command.password);

    return response;
  }
}

export default LoginHandler;
