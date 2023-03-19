import User from '@Domain/Entities/User';
import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import BCrypt from '@Infrastructure/Auth/Encrypt/BCrypt';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';
import BadRequestException from '@Infrastructure/Exceptions/BadRequestException';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import { Inject, Service } from 'typedi';

@Service()
class RegisterUserService {
  constructor(@Inject('user.rep.prisma') private readonly repository: IUserRepository) {}

  async register(data) {
    let dbUser = await this.repository.find({ email: data.email });
    if (dbUser) throw new BadRequestException('User already registered!');

    data.password = await BCrypt.encrypt(data.password);

    dbUser = await this.repository.create(data);

    const user = User.createFromDetails(dbUser);
    const token = JsonWebToken.encode({ sub: user.uid });

    return { user: user.values, token };
  }
}

export default RegisterUserService;
