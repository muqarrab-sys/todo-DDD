import Email from '../shared/objects/Email';
import Password from '../shared/objects/Password';
import { GenderEnum, IUser, IUserExposed, UserDoc } from './types';

class User implements IUser {
  id: string;
  name: string;
  email: Email;
  password: Password;
  gender: GenderEnum;
  dob: Date;

  constructor(userObj: UserDoc) {
    this.id = userObj._id;
    this.name = userObj.name;
    this.email = new Email(userObj.email);
    this.password = new Password(userObj.password);
    this.gender = userObj.gender;
    this.dob = userObj.dob;
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
}

export default User;