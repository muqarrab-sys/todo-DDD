import UserModel from './user.model';

class User extends UserModel {
  private model = new UserModel();

  constructor() {
    super();
  }
}

export default User;
