import User from '.';
import UserService from './user.service';

class UserFactory {
  async load(id: string) {
    const service = new UserService();
    const user = await service.findById(id);

    return new User(user);
  }
}

export default UserFactory;
