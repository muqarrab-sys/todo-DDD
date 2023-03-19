import { Command } from 'simple-command-bus';

class GoogleAuthCommand extends Command {
  constructor(public readonly code: string) {
    super();
  }

  static create(code: string) {
    return new GoogleAuthCommand(code);
  }
}

export default GoogleAuthCommand;
