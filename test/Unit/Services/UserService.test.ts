import { faker } from '@faker-js/faker';
import { assert, expect } from 'chai';
import { IUser } from '../../../interfaces/user';
import UserServices from '../../../src/Application/Services/User/UserServices';
import User from '../../../src/Domain/Entities/User';
import PrismaDatabase from '../../../src/Infrastructure/Database/Prisma/PrismaDatabase';
import UserRepository from '../../../src/Infrastructure/Repositories/UserRepository';
import { createStubInstance, stub } from 'sinon';
import SharedUtil from '../../../src/Infrastructure/Utils/SharedUtils';

describe('UserService', () => {
  let user: IUser;

  before(() => {
    user = User.create({
      uid: SharedUtil.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      dob: faker.date.birthdate(),
      gender: 'male',
      password: faker.lorem.word({ length: 8 }),
    });
  });

  it('registers a user and returns user object with token', async () => {
    const userRepo = new UserRepository();
    const stubRepo = stub(userRepo, 'create').returns(new Promise(res => res(user)));

    const service = new UserServices(userRepo);
    const response = await service.registerUser(user);

    assert.isTrue(stubRepo.calledOnce);
    expect(response.user.uid).eq(user.uid);
    assert.typeOf(response.token, 'string');
  });

  it('finds user by id and returns user object', async () => {
    const userRepo = new UserRepository();
    const stubRepo = stub(userRepo, 'find').returns(new Promise(res => res(user)));

    const service = new UserServices(userRepo);
    const response = await service.findById(user.uid);

    assert.isTrue(stubRepo.calledOnce);
    expect(response.uid).eq(user.uid);
  });
});
