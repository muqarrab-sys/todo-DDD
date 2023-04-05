import User from '@Domain/Entities/User';
import RegisterUserEvent from '@Application/Events/RegisterUserEvent';
import { UserServices } from '@Infrastructure/IoC/Containers';
import { RegisterUserCommand } from '../Commands';

class RegisterUserHandler {
  async handle(command: RegisterUserCommand) {
    const response = await UserServices.register(User.create(command));

    const event = new RegisterUserEvent();
    event.emit('registerUser', response.user);

    return response;
  }
}

export default RegisterUserHandler;
