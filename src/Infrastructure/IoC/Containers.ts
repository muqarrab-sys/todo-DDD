import BindContainer from './Binder';
import TodoService from '@Application/Services/Todo/TodoServices';
import UserService from '@Application/Services/User/UserServices';
import AuthService from '@Application/Services/Auth/AuthServices';
import PrismaDatabase from '@Infrastructure/Database/Prisma/PrismaDatabase';
import configs from '@Infrastructure/Configs';
import UserRepositoryImpl from '@Infrastructure/Repositories/UserRepository';
import TodoRepositoryImpl from '@Infrastructure/Repositories/TodoRepository';
import NodeMailer from '@Infrastructure/Mailer/NodeMailer';
import SlackNotifier from '@Infrastructure/Utils/SlackNotifier';

const container = BindContainer();

export const Configs = container.get<typeof configs>('configs');
export const Database = container.get(PrismaDatabase);
export const UserRepository = container.get(UserRepositoryImpl);
export const TodoRepository = container.get(TodoRepositoryImpl);
export const AuthServices = container.get(AuthService);
export const UserServices = container.get(UserService);
export const TodoServices = container.get(TodoService);
export const Mailer = container.get(NodeMailer);
export const Slack = container.get(SlackNotifier);

export default container;
