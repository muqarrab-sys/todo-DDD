import { IGoogleUser } from './types';
import User from './User';

class GoogleUser extends User implements IGoogleUser {
  accessToken: string;
  googleId: string;

  constructor(userObj) {
    super(userObj);

    this.accessToken = userObj.accessToken;
    this.googleId = userObj.googleId;
  }
}

export default GoogleUser;
