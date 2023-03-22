import commandBus from '@Application/CommandBus';
import { LoginCommand, RegisterUserCommand, UpdatePasswordCommand, UpdateUserProfileCommand } from '@Application/Services/User/Commands';
import HttpResponse from '@Infrastructure/Utils/HttpResponse';
import { IHandler } from '@interfaces/index';
import { GenderEnum, UserCredentialObject, UserInputObject, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';

class UserController {
  public register: IHandler = async (req, res) => {
    const data: UserInputObject = req.body;

    const command = RegisterUserCommand.create(data.name, data.email, data.password, data.gender as GenderEnum, data.dob);
    const response = await commandBus.handle(command);

    return HttpResponse.created(response, 'User Registered!');
  };

  public login: IHandler = async (req, res) => {
    const data: UserCredentialObject = req.body;

    const command = LoginCommand.create(data.email, data.password);
    const response = await commandBus.handle(command);

    return HttpResponse.ok(response);
  };

  public updateProfile: IHandler = async (req, res) => {
    const body: UserUpdateObject = req.body;

    const command = UpdateUserProfileCommand.create(req.user, body);
    const response = await commandBus.handle(command);

    return HttpResponse.ok(response, 'User Profile Updated!');
  };

  public updatePassword: IHandler = async (req, res) => {
    const body: UserUpdatePasswordObject = req.body;

    const command = UpdatePasswordCommand.create(req.user, body);
    const response = commandBus.handle(command);

    return HttpResponse.ok(response, 'Password updated!');
  };
}

export default UserController;
