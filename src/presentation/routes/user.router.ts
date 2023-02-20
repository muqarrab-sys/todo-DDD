import UserController from '@presentation/controllers/user.controller';
import AuthorizedRouter from './AuthorizedRouter';

class UserRouter extends AuthorizedRouter<UserController> {
  constructor(path: string) {
    super(UserController, path);
  }

  protected routes(): void {
    this.get('', (req, res, next) => {
      res.send('hello');
    });
  }
}

export default UserRouter;
