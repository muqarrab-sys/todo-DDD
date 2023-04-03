import { Container } from 'inversify';
import UserRepository from './UserRepository';
import TodoRepository from './TodoRepository';

function RepositoryProvider(c: Container) {
  c.bind<UserRepository>(UserRepository).to(UserRepository);
  c.bind<TodoRepository>(TodoRepository).to(TodoRepository);

  return c;
}

export default RepositoryProvider;
