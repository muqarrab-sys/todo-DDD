import BindContainer from './Binder';
import TodoService from '@Application/Services/Todo/TodoServices';
import UserService from '@Application/Services/User/UserServices';
import AuthService from '@Application/Services/Auth/AuthServices';
import PrismaDatabase from '@Infrastructure/Database/Prisma/PrismaDatabase';
import configs from '@Infrastructure/Configs';
import UserRepositoryImpl from '@Infrastructure/Repositories/UserRepository';
import TodoRepositoryImpl from '@Infrastructure/Repositories/TodoRepository';

const container = BindContainer();

const Configs = container.get<typeof configs>('configs');
const Database = container.get(PrismaDatabase);
const UserRepository = container.get(UserRepositoryImpl);
const TodoRepository = container.get(TodoRepositoryImpl);
const AuthServices = container.get(AuthService);
const UserServices = container.get(UserService);
const TodoServices = container.get(TodoService);

export { Configs, Database, UserRepository, TodoRepository, AuthServices, UserServices, TodoServices };

export default container;
