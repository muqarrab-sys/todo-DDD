import { Container } from 'inversify';
import UserRepository from './UserRepository';
import TodoRepository from './TodoRepository';
import Symbols from '@Infrastructure/IoC/Symbols';

function RepositoryProvider(c: Container) {
  c.bind<UserRepository>(Symbols.UserRepository).to(UserRepository);
  c.bind<TodoRepository>(Symbols.TodoRepository).to(TodoRepository);

  return c;
}

export default RepositoryProvider;
