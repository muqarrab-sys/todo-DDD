import RegisterUserEvent from '@Domain/Events/RegisterUserEvent';
import { RegUserDomainService } from '@Infrastructure/IoC/Containers';
import { RegisterUserCommand } from '../Commands';

class RegisterUserHandler {
  async handle(command: RegisterUserCommand) {
    const response = await RegUserDomainService.register(command);

    const event = new RegisterUserEvent();
    event.emit('registerUser', response.user);

    return response;
  }
}

export default RegisterUserHandler;
