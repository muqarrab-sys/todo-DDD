import Email from '@/domain/ValueObjects/Email';
import Password from '@/domain/ValueObjects/Password';
import { GenderEnum, IPrismaUser, IUser, IUserModel } from './types';

class User implements IUser {
  id: number;
  uid: string;
  name: string;
  email: Email;
  password: Password;
  gender: GenderEnum;
  dob: Date;
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

  static create(obj: IUserModel) {
    const email = new Email(obj.email);
    const password = new Password(obj.password);

    return new User(obj.id, obj.uid, obj.name, email, password, obj.gender, obj.dob, obj.createdAt, obj.updatedAt);
  }

  static createFromDetails(obj: IPrismaUser) {
    const email = new Email(obj.email);
    const password = new Password(obj.password);
    const gender = obj.gender as GenderEnum;

    return new User(obj.id, obj.uid, obj.name, email, password, gender, obj.dob, obj.createdAt, obj.updatedAt);
  }
}

export default User;
