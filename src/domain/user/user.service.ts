import UserRepository from '@infra/persistence/repositories/user.repository';
import { UserCreationDto } from './dtos/user.dtos';
import { IUserModel } from './types';

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async register(userObj: UserCreationDto) {
    const user = await this.repository.findByEmail(userObj.email.value);
    if (user) throw new Error('User already exists');

    const params: IUserModel = {
      email: userObj.email.value,
      name: userObj.name,
      gender: userObj.gender,
      dob: userObj.dob,
      password: null,
    };

    params.password = await userObj.password.encode();

    return await this.repository.create(params);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }
}

export default UserService;
