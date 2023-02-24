import Email from '../shared/objects/Email';
import { GenderEnum, IUserModelObject } from './types';
import User from './User';

class GoogleUser extends User {
  accessToken: string;
  googleId: string;

  constructor(id: string, name: string, email: Email, gender: GenderEnum, dob: Date, accessToken: string, googleId: string) {
    super(id, name, email, null, gender, dob);

    this.accessToken = accessToken;
    this.googleId = googleId;
  }

  static create(raw: IUserModelObject) {
    const email = new Email(raw.email);

    return new GoogleUser(raw._id, raw.name, email, raw.gender, raw.dob, raw.accessToken, raw.googleId);
  }
}

export default GoogleUser;
