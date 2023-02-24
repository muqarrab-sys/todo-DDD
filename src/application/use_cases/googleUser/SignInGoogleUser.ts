import GoogleUser from '@/domain/user/GoogleUser';
import IUserRepository from '@/domain/user/repository/IUserRepository';
import { IUserModelObject } from '@/domain/user/types';
import Auth from '@/infra/auth/Auth';
import OAuth2 from '@/infra/auth/OAuth2';

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

    let userObj = await this.repository.findByEmail(googleUser.email);
    if (!userObj) {
      const raw: IUserModelObject = {
        name: googleUser.name,
        email: googleUser.email,
        accessToken: res.tokens.access_token,
        googleId: googleUser.sub,
      };

      userObj = await this.repository.create(raw);
    }

    const auth = new Auth();
    const user = GoogleUser.create(userObj);
    const token = auth.genToken({ id: user.id });

    return { user: user.values, token };
  }
}

export default SignInGoogleUser;
