import Email from '@/domain/ValueObjects/Email';
import Password from '@/domain/ValueObjects/Password';
import { GenderEnum, IUser, IUserModel, UserInput } from './types';

class User implements IUser {
  id: number;
  uid: string;
  name: string;
  email: Email;
  password: Password;
  gender: GenderEnum;
  dob: Date;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    uid: string,
    name: string,
    email: Email,
    password: Password,
    gender: GenderEnum,
    dob: Date,
    googleId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.dob = dob;
    this.googleId = googleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get values() {
    return {
      id: this.id,
      uid: this.uid,
      name: this.name,
      email: this.email.value,
      gender: this.gender,
      dob: this.dob,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static create(obj: UserInput) {
    const email = new Email(obj.email);
    const password = obj?.password ? new Password(obj.password) : null;
    const gender = obj.gender as GenderEnum;

    return new User(obj?.id, obj?.uid, obj.name, email, password, gender, obj.dob, obj?.googleId, obj?.createdAt, obj?.updatedAt);
  }

  static createFromDetails(obj: IUserModel) {
    const email = new Email(obj.email);
    const password = obj?.password ? new Password(obj.password, true) : null;
    const gender = obj.gender as GenderEnum;

    return new User(obj.id, obj.uid, obj.name, email, password, gender, obj.dob, obj?.googleId, obj.createdAt, obj.updatedAt);
  }
}

export default User;
