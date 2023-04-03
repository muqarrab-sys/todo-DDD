import { Container } from 'inversify';
import UserServices from './User/UserServices';
import AuthServices from './Auth/AuthServices';
import TodoService from './Todo/TodoServices';

function ServicesProvider(c: Container) {
  c.bind<AuthServices>(AuthServices).to(AuthServices);
  c.bind<UserServices>(UserServices).to(UserServices);
  c.bind<TodoService>(TodoService).to(TodoService);

  return c;
}

export default ServicesProvider;
