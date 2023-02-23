import { ConflictException } from '@/application/exceptions';
import User from '@/domain/user';
import IUserRepository from '@/domain/user/repository/IUserRepository';
import { IUserCreationObject, IUserModelObject } from '@/domain/user/types';

class RegisterUser {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(raw: IUserCreationObject) {
    let user = await this.repository.findByEmail(raw.email.value);
    if (user) throw new ConflictException('User already exists');

    const obj: IUserModelObject = {
      ...raw,
      email: raw.email.value,
      password: await raw.password.encode(),
    };

    user = await this.repository.create(obj);

    return User.create(user);
  }
}

export default RegisterUser;
