import configs from '@/infra/authorization/configs';
import OAuth2 from '@/infra/authorization/OAuth2';

class AuthService {
  private readonly oAuth2Client: OAuth2;

  constructor() {
    this.oAuth2Client = new OAuth2(configs.googleAuth.web);
  }

  getAuthUrl() {
    return this.oAuth2Client.generateAuthUrl();
  }
}

export default AuthService;
