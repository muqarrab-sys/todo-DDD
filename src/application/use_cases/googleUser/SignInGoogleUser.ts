import GoogleUser from '@/domain/user/GoogleUser';
import IUserRepository from '@/domain/user/repository/IUserRepository';
import { IUserModelObject } from '@/domain/user/types';
import OAuth2 from '@/infra/authorization/OAuth2';

class SignInGoogleUser {
  private repository: IUserRepository;
  private googleClient: OAuth2;

  constructor(repository: IUserRepository, googleClient: OAuth2) {
    this.repository = repository;
    this.googleClient = googleClient;
  }

  async execute(code: string) {
    const res = await this.googleClient.getToken(code);
    const googleUser = await this.googleClient.getGoogleUser(res.tokens.id_token);

    const user = await this.repository.findByEmail(googleUser.email);
    if (!user) {
      const raw: IUserModelObject = {
        name: googleUser.name,
        email: googleUser.email,
        accessToken: res.tokens.access_token,
        googleId: googleUser.sub,
      };

      const user = await this.repository.create(raw);

      return GoogleUser.create(user);
    }

    return GoogleUser.create(user);
  }
}

export default SignInGoogleUser;
