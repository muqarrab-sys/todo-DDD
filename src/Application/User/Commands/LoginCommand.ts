import { Command } from 'simple-command-bus';

class LoginCommand extends Command {
  constructor(public readonly email: string, public readonly password: string) {
    super();
  }

  static create(email: string, password: string) {
    return new LoginCommand(email, password);
  }
}

export default LoginCommand;
