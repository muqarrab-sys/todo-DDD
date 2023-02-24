import TodoRepository from '../repositories/todo.repository';
import UserRepository from '../repositories/user.repository';
import BaseSeed from './base/BaseSeed';
import TodoSeed from './TodoSeed';
import UserSeed from './UserSeed';

const seeds = {
  user: { seeder: UserSeed, repository: UserRepository },
  todo: { seeder: TodoSeed, repository: TodoRepository },
};

export default class SeedFactory {
  create(str: string): BaseSeed {
    const repository = new seeds[str].repository();
    return new seeds[str].seeder(repository);
  }
}
