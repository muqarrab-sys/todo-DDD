import { IUser, UserUpdatePasswordObject } from '@interfaces/user';
import { Command } from 'simple-command-bus';

class UpdatePasswordCommand extends Command {
  constructor(
    public readonly user: IUser,
    public readonly oldPassword: string,
    public readonly newPassword: string,
    public readonly confirmPassword: string,
  ) {
    super();
  }

  static create(user: IUser, obj: UserUpdatePasswordObject) {
    return new UpdatePasswordCommand(user, obj.oldPassword, obj.newPassword, obj.confirmPassword);
  }
}

export default UpdatePasswordCommand;
