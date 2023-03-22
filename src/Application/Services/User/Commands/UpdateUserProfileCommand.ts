import { GenderEnum, IUser, UserUpdateObject } from '@interfaces/user';
import { Command } from 'simple-command-bus';

class UpdateUserProfileCommand extends Command {
  constructor(public readonly user: IUser, public readonly name: string, public readonly gender: GenderEnum, public readonly dob: Date) {
    super();
  }

  static create(user: IUser, updateObject: UserUpdateObject) {
    return new UpdateUserProfileCommand(user, updateObject.name, updateObject.gender as GenderEnum, updateObject.dob);
  }
}

export default UpdateUserProfileCommand;
