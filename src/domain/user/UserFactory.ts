import configs from '@/infra/authorization/configs';
import OAuth2 from '@/infra/authorization/OAuth2';
import { TokenPayload } from 'google-auth-library';
import User from '.';
import Email from '../shared/objects/Email';
import { UserCredentialsDto } from './dtos/user.dtos';
import GoogleUser from './GoogleUser';
import { IGoogleUser, IUserCreation } from './types';
import UserService from './user.service';

class UserFactory {
  private oAuth2Client: OAuth2;
  private service: UserService;

  constructor() {
    this.service = new UserService();
    this.oAuth2Client = new OAuth2(configs.googleAuth.web);
  }

  async create(userObj: IUserCreation) {
    const user = await this.service.register(userObj);

    return new User(user);
  }

  async load(id: string) {
    const user = await this.service.find(id);

    return new User(user);
  }

  async loadByLogin(obj: UserCredentialsDto) {
    const user = await this.service.login(obj);

    return new User(user);
  }

  async createGoogleUser(code: string) {
    const res = await this.oAuth2Client.getToken(code);
    const googleUser = await this.oAuth2Client.getGoogleUser(res.tokens.id_token);

    return await this.saveGoogleUser(googleUser, res.tokens.access_token);
  }

  async loadGoogleUser(code: string) {
    const res = await this.oAuth2Client.getToken(code);
    const googleUser = await this.oAuth2Client.getGoogleUser(res.tokens.id_token);

    const user = await this.service.findByEmail(googleUser.email);
    if (!user) {
      return await this.saveGoogleUser(googleUser, res.tokens.access_token);
    }

    return new GoogleUser(user);
  }

  private async saveGoogleUser(userObj: TokenPayload, accessToken: string) {
    const params: IGoogleUser = {
      name: userObj.name,
      email: new Email(userObj.email),
      accessToken: accessToken,
      googleId: userObj.sub,
    };

    const user = await this.service.register(params);

    return new GoogleUser(user);
  }
}

export default UserFactory;
