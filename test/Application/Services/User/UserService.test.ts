import { faker } from '@faker-js/faker';
import { assert, expect } from 'chai';
import { stub } from 'sinon';
import { IUser } from '../../../../interfaces/user';
import UserServices from '../../../../src/Application/Services/User/UserServices';
import User from '../../../../src/Domain/Entities/User';
import UserRepository from '../../../../src/Infrastructure/Repositories/UserRepository';

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

    userRepo = new UserRepository();
    service = new UserServices(userRepo);
  });

  it('registers a user and returns user object with token', async () => {
    const stubRepo = stub(userRepo, 'create').returns(new Promise(res => res(user)));

    const response = await service.register(user);

    assert.isTrue(stubRepo.calledOnce);
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
