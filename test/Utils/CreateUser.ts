import { faker } from '@faker-js/faker';
import Container from 'typedi';
import { ReturnableUser } from '../../interfaces/user';
import UserService from '../../src/Application/Services/User/UserServices';
import User from '../../src/Domain/Entities/User';

class CreateUser {
  constructor(private readonly service: UserService, private readonly user: ReturnableUser, private readonly authToken: string) {}

  get values(): ReturnableUser {
    return this.user;
  }

  get token(): string {
    return this.authToken;
  }

  async delete() {
    this.service.deleteUser(this.user.uid);
  }

  static async create() {
    const service = Container.get(UserService);

    const response = await service.registerUser(
      User.create({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: '1234567890',
        dob: faker.date.birthdate(),
        gender: 'male',
      }),
    );

    return new CreateUser(service, response.user, response.token);
  }
}

export default CreateUser;
