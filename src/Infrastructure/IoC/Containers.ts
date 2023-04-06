import AuthService from '@Application/Auth/AuthServices';
import TodoService from '@Application/Todo/TodoServices';
import UserService from '@Application/User/UserServices';
import configs from '@Infrastructure/Configs';
import PrismaDatabase from '@Infrastructure/Database/Prisma/PrismaDatabase';
import TodoRepositoryImpl from '@Infrastructure/Repositories/TodoRepository';
import UserRepositoryImpl from '@Infrastructure/Repositories/UserRepository';
import SlackNotifier from '@Infrastructure/Utils/SlackNotifier';
import { ILogger, IMailer } from '@interfaces/index';
import ServicesBinder from './ServicesBinder';
import Symbols from './Symbols';

const container = ServicesBinder();

export const Configs = container.get<typeof configs>(Symbols.Configs);
export const Database = container.get<PrismaDatabase>(Symbols.PrismaDatabase);
export const UserRepository = container.get<UserRepositoryImpl>(Symbols.UserRepository);
export const TodoRepository = container.get<TodoRepositoryImpl>(Symbols.TodoRepository);
export const AuthServices = container.get<AuthService>(Symbols.AuthServices);
export const UserServices = container.get<UserService>(Symbols.UserServices);
export const TodoServices = container.get<TodoService>(Symbols.TodoServices);
export const Mailer = container.get<IMailer>(Symbols.NodeMailer);
export const Slack = container.get<SlackNotifier>(Symbols.SlackNotifier);
export const Logger = container.get<ILogger>(Symbols.Logger);

export default container;
