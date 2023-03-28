import AuthService from '@Application/Services/Auth/AuthServices';
import TodoService from '@Application/Services/Todo/TodoServices';
import UserService from '@Application/Services/User/UserServices';
import TodoRepository from '@Infrastructure/Repositories/TodoRepository';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import Container from 'typedi';

Container.set('todo.repo.prisma', new TodoRepository());
Container.set('user.rep.prisma', new UserRepository());

export const TodoServices = Container.get(TodoService) as TodoService;
export const UserServices = Container.get(UserService) as UserService;
export const AuthServices = Container.get(AuthService) as AuthService;
