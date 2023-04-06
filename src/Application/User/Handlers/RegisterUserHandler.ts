import User from '@Domain/Entities/User';
import Events, { EventEmitter } from '@Infrastructure/Events';
import { UserServices } from '@Infrastructure/IoC/Containers';
import { IUserCreatedEvent } from '@interfaces/Events';
import { RegisterUserCommand } from '../Commands';

class RegisterUserHandler {
  async handle(command: RegisterUserCommand) {
    const response = await UserServices.register(User.create(command));

    const event: IUserCreatedEvent = {
      email: response.user.email,
      name: response.user.name,
      ocurredAt: response.user.createdAt,
    };

    EventEmitter.emit(Events.UserCreatedEvent, event);

    return response;
  }
}

export default RegisterUserHandler;
