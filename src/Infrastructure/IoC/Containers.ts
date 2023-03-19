import Container from 'typedi';
import RegisterUserService from '@Domain/Services/User/RegisterUserService';
import LoginUserService from '@Domain/Services/User/LoginUserService';
import GoogleAuthService from '@Domain/Services/Auth/GoogleAuthService';
import UpdateUserService from '@Domain/Services/User/UpdateUserService';
import TodoRepository from '@Infrastructure/Repositories/TodoRepository';
import UserRepository from '@Infrastructure/Repositories/UserRepository';
import TodoService from '@Domain/Services/Todo/TodoServices';
import UserServices from '@Application/Services/User/UserServices';

Container.set('todo.repo.prisma', new TodoRepository());
Container.set('user.rep.prisma', new UserRepository());

export const RegUserDomainService = Container.get(RegisterUserService) as RegisterUserService;
export const LoginDomainService = Container.get(LoginUserService) as LoginUserService;
export const GoogleAuthDomainService = Container.get(GoogleAuthService) as GoogleAuthService;
export const UpdateUserDomainService = Container.get(UpdateUserService) as UpdateUserService;
export const TodoDomainService = Container.get(TodoService) as TodoService;
export const UserDomainService = Container.get(UserServices) as UserServices;
