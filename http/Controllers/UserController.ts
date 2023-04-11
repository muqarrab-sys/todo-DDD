import commandBus from '@Application/CommandBus';
import { LoginCommand, RegisterUserCommand, UpdatePasswordCommand, UpdateUserProfileCommand } from '@Application/User/Commands';
import { GenderEnum, UserCredentialObject, UserInputObject, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/User';
import { IHandler } from '@interfaces/express/types';
import BaseController from './Base/BaseController';

class UserController extends BaseController {
  public register: IHandler = async req => {
    const data: UserInputObject = req.body;

    const command = RegisterUserCommand.create(data.name, data.email, data.password, data.gender as GenderEnum, data.dob);
    const response = await commandBus.handle(command);

    return this.created(response, 'User Registered!');
  };

  public login: IHandler = async req => {
    const data: UserCredentialObject = req.body;

    const command = LoginCommand.create(data.email, data.password);
    const response = await commandBus.handle(command);

    return this.ok(response);
  };

  public updateProfile: IHandler = async req => {
    const body: UserUpdateObject = req.body;

    const command = UpdateUserProfileCommand.create(req.user, body);
    const response = await commandBus.handle(command);

    return this.ok(response, 'User Profile Updated!');
  };

  public updatePassword: IHandler = async req => {
    const body: UserUpdatePasswordObject = req.body;

    const command = UpdatePasswordCommand.create(req.user, body);
    const response = commandBus.handle(command);

    return this.ok(response, 'Password updated!');
  };
}

export default UserController;
