import { expect } from 'chai';
import AuthServices from '../../../../src/Application/Services/Auth/AuthServices';
import UserRepository from '../../../../src/Infrastructure/Repositories/UserRepository';

describe('Auth Service', () => {
  it('returns google auth url', () => {
    const service = new AuthServices(new UserRepository());

    const auth = service.generateGoogleAuthUrl();

    expect(auth.url).to.be.a('string');
  });
});
