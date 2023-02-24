import Email from '../shared/objects/Email';
import Password from '../shared/objects/Password';
import { GenderEnum, IUser, IUserExposed, IUserModelObject } from './types';

class User implements IUser {
  id: string;
  name: string;
  email: Email;
  password: Password;
  gender: GenderEnum;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, name: string, email: Email, password: Password, gender: GenderEnum, dob: Date, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.dob = dob;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get values(): IUserExposed {
    return {
      id: this.id,
      name: this.name,
      email: this.email.value,
      gender: this.gender,
      dob: this.dob,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static create(obj: IUserModelObject) {
    const email = new Email(obj.email);
    const password = new Password(obj.password);

    return new User(obj._id, obj.name, email, password, obj.gender, obj.dob, obj.createdAt, obj.updatedAt);
  }
}

export default User;
