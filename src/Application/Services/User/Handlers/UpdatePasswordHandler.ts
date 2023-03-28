import { UserServices } from '@Infrastructure/IoC/Containers';
import { UpdatePasswordCommand } from '../Commands';

class UpdatePasswordHandler {
  async handle(command: UpdatePasswordCommand) {
    try {
      return await UserServices.updatePassword(command.user, {
        oldPassword: command.oldPassword,
        newPassword: command.newPassword,
        confirmPassword: command.confirmPassword,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UpdatePasswordHandler;
