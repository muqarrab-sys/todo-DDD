import { GenderEnum, IUser, IUserModel, UserInput } from '@interfaces/user';

class User implements IUser {
  id: number;
  uid: string;
  name: string;
  email: string;
  password: string;
  gender: GenderEnum;
  dob: Date;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    uid: string,
    name: string,
    email: string,
    password: string,
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
      email: this.email,
      gender: this.gender,
      dob: this.dob,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static create(obj: UserInput) {
    return new User(
      obj?.id,
      obj?.uid,
      obj?.name,
      obj.email,
      obj?.password,
      obj?.gender as GenderEnum,
      obj?.dob,
      obj?.googleId,
      obj?.createdAt,
      obj?.updatedAt,
    );
  }

  static createFromDetails(obj: IUserModel) {
    return new User(
      obj.id,
      obj.uid,
      obj?.name,
      obj.email,
      obj?.password,
      obj?.gender as GenderEnum,
      obj?.dob,
      obj?.googleId,
      obj.createdAt,
      obj.updatedAt,
    );
  }
}

export default User;
