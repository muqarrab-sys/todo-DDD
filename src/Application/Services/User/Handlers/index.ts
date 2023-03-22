import LoginHandler from './LoginHandler';
import RegisterUserHandler from './RegisterUserHandler';
import UpdateUserProfileHandler from './UpdateUserProfileHandler';
import UpdatePasswordHandler from './UpdatePasswordHandler';

export default {
  RegisterUserHandler: new RegisterUserHandler(),
  LoginHandler: new LoginHandler(),
  UpdateUserProfileHandler: new UpdateUserProfileHandler(),
  UpdatePasswordHandler: new UpdatePasswordHandler(),
};
