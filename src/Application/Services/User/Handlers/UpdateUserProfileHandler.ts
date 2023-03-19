import { UpdateUserDomainService } from '@Infrastructure/IoC/Containers';
import { UpdateUserProfileCommand } from '../Commands';

class UpdateUserProfileHandler {
  async handle(command: UpdateUserProfileCommand) {
    return await UpdateUserDomainService.updateProfile(command.user, {
      name: command.name,
      gender: command.gender,
      dob: command.dob,
    });
  }
}

export default UpdateUserProfileHandler;
