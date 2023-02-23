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

  constructor(id: string, name: string, email: Email, password: Password, gender: GenderEnum, dob: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.dob = dob;
  }

  get values(): IUserExposed {
    return {
      id: this.id,
      name: this.name,
      email: this.email.value,
      gender: this.gender,
      dob: this.dob,
    };
  }

  static create(raw: IUserModelObject) {
    const email = new Email(raw.email);
    const password = new Password(raw.password);

    return new User(raw._id, raw.name, email, password, raw.gender, raw.dob);
  }
}

export default User;
