import { GenderEnum } from '@interfaces/user';
import { Command } from 'simple-command-bus';

class RegisterUserCommand extends Command {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly gender: GenderEnum,
    public readonly dob: Date,
  ) {
    super();
  }

  static create(name: string, email: string, password: string, gender: GenderEnum, dob: Date) {
    return new RegisterUserCommand(name, email, password, gender as GenderEnum, dob);
  }
}

export default RegisterUserCommand;
