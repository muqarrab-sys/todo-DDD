import { faker } from '@faker-js/faker';
import { ReturnableUser } from '../../interfaces/user';
import User from '../../src/Domain/Entities/User';
import { RegUserDomainService, UserDomainService } from '../../src/Infrastructure/IoC/Containers';

class CreateUser {
  constructor(private readonly user: ReturnableUser, private readonly authToken: string) {}

  get values(): ReturnableUser {
    return this.user;
  }

  get token(): string {
    return this.authToken;
  }

  async delete() {
    await UserDomainService.deleteUser(this.user.uid);
  }

  static async create() {
    const response = await RegUserDomainService.register(
      User.create({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: '1234567890',
        dob: faker.date.birthdate(),
        gender: 'male',
      }),
    );

    return new CreateUser(response.user, response.token);
  }
}

export default CreateUser;