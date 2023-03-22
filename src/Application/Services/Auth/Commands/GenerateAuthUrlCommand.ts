import { Command } from 'simple-command-bus';

class GenerateAuthUrlCommand extends Command {
  constructor() {
    super();
  }
}

export default GenerateAuthUrlCommand;
