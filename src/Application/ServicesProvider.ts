import Symbols from '@Infrastructure/IoC/Symbols';
import { Container } from 'inversify';
import AuthServices from './Auth/AuthServices';
import TodoServices from './Todo/TodoServices';
import UserServices from './User/UserServices';

function ServicesProvider(c: Container) {
  c.bind<AuthServices>(Symbols.AuthServices).to(AuthServices);
  c.bind<UserServices>(Symbols.UserServices).to(UserServices);
  c.bind<TodoServices>(Symbols.TodoServices).to(TodoServices);

  return c;
}

export default ServicesProvider;
