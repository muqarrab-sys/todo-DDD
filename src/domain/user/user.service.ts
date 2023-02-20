import UserRepository from '@infra/persistence/user.repository';
import { UserCreationDto } from './dtos/user.dtos';
import { IUser } from './user.model';

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async register(userObj: UserCreationDto) {
    const user = await this.repository.findByEmail(userObj.email.value);
    if (user) throw new Error('User already exists');

    const params: IUser = {
      email: userObj.email.value,
      name: userObj.name,
      gender: userObj.gender,
      dob: userObj.dob,
      password: null,
    };

    params.password = await userObj.password.encode();

    return await this.repository.create(params);
  }
}

export default UserService;
