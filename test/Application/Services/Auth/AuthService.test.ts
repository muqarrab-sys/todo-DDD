import { expect } from 'chai';
import AuthServices from '../../../../src/Application/Services/Auth/AuthServices';
import UserRepository from '../../../../src/Infrastructure/Repositories/UserRepository';
import MockDatabase from '../../../Mock/Database';

describe('Auth Service', () => {
  it('returns google auth url', () => {
    const service = new AuthServices(new UserRepository(new MockDatabase()));

    const auth = service.generateGoogleAuthUrl();

    expect(auth.url).to.be.a('string');
  });
});
