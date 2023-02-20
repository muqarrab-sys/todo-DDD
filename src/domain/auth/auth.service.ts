import UserRepository from '@/infra/persistence/user.repository';
import { UserCredentialsDto } from './dtos/auth.dtos';

class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async login(userCreds: UserCredentialsDto) {
    const user = await this.repository.findByEmail(userCreds.email.value);
    if (!user) throw new Error('User not found');

    const matchPassword = userCreds.password.compare(user.password);
    if (!matchPassword) throw new Error('Wrong password');

    return user;
  }
}

export default AuthService;
