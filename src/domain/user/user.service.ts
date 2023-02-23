import UserRepository from '@infra/persistence/repositories/user.repository';
import { UserCredentialsDto } from './dtos/user.dtos';
import { IUserCreation, IUserModel } from './types';

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async register(userObj: IUserCreation) {
    const user = await this.repository.findByEmail(userObj.email.value);
    if (user) throw new Error('User already exists');

    const params: IUserModel = {
      ...userObj,
      email: userObj.email.value,
      password: await userObj?.password?.encode(),
    };

    return await this.repository.create(params);
  }

  async login(userCreds: UserCredentialsDto) {
    const user = await this.repository.findByEmail(userCreds.email.value);
    if (!user) throw new Error('User not found');

    const matchPassword = userCreds.password.compare(user.password);
    if (!matchPassword) throw new Error('Wrong password');

    return user;
  }

  async find(id: string) {
    return await this.repository.find(id);
  }

  async findByEmail(email: string) {
    return await this.repository.findByEmail(email);
  }
}

export default UserService;
