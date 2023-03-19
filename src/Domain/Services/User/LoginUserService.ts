import User from '@Domain/Entities/User';
import IUserRepository from '@Domain/Entities/User/Repository/IUserRepository';
import BCrypt from '@Infrastructure/Auth/Encrypt/BCrypt';
import JsonWebToken from '@Infrastructure/Auth/JsonWebToken';
import { NotFoundException, UnAuthorizedException } from '@Infrastructure/Exceptions';
import BadRequestException from '@Infrastructure/Exceptions/BadRequestException';
import { Inject, Service } from 'typedi';

@Service()
class LoginUserService {
  constructor(@Inject('user.rep.prisma') private readonly repository: IUserRepository) {}

  async login(email: string, password: string) {
    const dbUser = await this.repository.find({ email });
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    if (dbUser.googleId) throw new UnAuthorizedException('This account can only be logged in through google');

    const isMatch = await BCrypt.compare(password, dbUser.password);
    if (!isMatch) throw new BadRequestException('Wrong Password!');

    const user = User.createFromDetails(dbUser);
    const token = JsonWebToken.encode({ sub: user.uid });

    return { user: user.values, token };
  }
}

export default LoginUserService;
