import { faker } from '@faker-js/faker';
import { assert, expect } from 'chai';
import { stub } from 'sinon';
import { IUser } from '../../../../interfaces/User';
import UserServices from '../../../../src/Application/User/UserServices';
import User from '../../../../src/Domain/Entities/User';
import UserRepository from '../../../../src/Infrastructure/Repositories/UserRepository';
import MockDatabase from '../../../Mock/MockDatabase';

describe('UserService', () => {
  let user: IUser;
  let userRepo: UserRepository;
  let service: UserServices;

  before(() => {
    user = User.create({
      uid: faker.datatype.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      dob: faker.date.birthdate(),
      gender: 'male',
      password: faker.lorem.word({ length: 8 }),
    });

    userRepo = new UserRepository(new MockDatabase());
    service = new UserServices(userRepo);
  });

  it('registers a user and returns user object with token', async () => {
    const stubCreate = stub(userRepo, 'create').returns(new Promise(res => res(user)));
    const stubFind = stub(userRepo, 'find').returns(new Promise(res => res(null)));

    const response = await service.register(user);

    stubFind.restore();

    assert.isTrue(stubCreate.calledOnce);
    expect(response.user.uid).eq(user.uid);
    assert.typeOf(response.token, 'string');
  });

  it('finds user by id and returns user object', async () => {
    const stubRepo = stub(userRepo, 'find').returns(new Promise(res => res(user)));

    const response = await service.findById(user.uid);

    assert.isTrue(stubRepo.calledOnce);
    expect(response.uid).eq(user.uid);
  });
});
