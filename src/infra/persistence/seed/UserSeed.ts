import IUserRepository from '@/domain/user/repository/IUserRepository';
import { GenderEnum, IUserModelObject } from '@/domain/user/types';
import { faker } from '@faker-js/faker';
import BaseSeed from './base/BaseSeed';

export default class UserSeed extends BaseSeed<IUserRepository> {
  constructor(repository: IUserRepository) {
    super(repository);
  }

  async execute(num: number) {
    for (let i = 0; i < num; i++) {
      let gender = GenderEnum.MALE;
      if (Math.round(Math.random())) GenderEnum.FEMALE;

      const fakeUserObjs: IUserModelObject = {
        name: faker.name.fullName({ sex: gender }),
        email: `todo_ddd_mhs+${faker.random.alphaNumeric()}@gmail.com`,
        dob: faker.date.birthdate(),
        gender,
        password: faker.random.alphaNumeric(8),
      };

      const user = await this.repository.create(fakeUserObjs);
      console.log(`${i + 1}: ${user.id}`);
    }
  }
}
