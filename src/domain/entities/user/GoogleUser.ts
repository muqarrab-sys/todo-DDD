import Email from '../shared/objects/Email';
import { GenderEnum, IUserModelObject } from './types';
import User from './User';

class GoogleUser extends User {
  accessToken: string;
  googleId: string;

  constructor(
    id: string,
    name: string,
    email: Email,
    gender: GenderEnum,
    dob: Date,
    accessToken: string,
    googleId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, name, email, null, gender, dob, createdAt, updatedAt);

    this.accessToken = accessToken;
    this.googleId = googleId;
  }

  static create(obj: IUserModelObject) {
    const email = new Email(obj.email);

    return new GoogleUser(obj._id, obj.name, email, obj.gender, obj.dob, obj.accessToken, obj.googleId, obj.createdAt, obj.updatedAt);
  }
}

export default GoogleUser;
