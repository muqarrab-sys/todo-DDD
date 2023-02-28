import IUserRepository from '@/domain/entities/user/repository/IUserRepository';
import OAuth2 from '@/infrastructure/auth/google/OAuth2';
import configs from '@/infrastructure/configs';
import BaseServices from './base/BaseServices';

class AuthServices extends BaseServices<IUserRepository> {
  constructor(Repository: { new (): IUserRepository }) {
    super(Repository);
  }

  generateGoogleAuthUrl() {
    const oAuth2 = new OAuth2(configs.googleAuth.web);

    const url = oAuth2.generateAuthUrl();

    return { url };
  }
}

export default AuthServices;
