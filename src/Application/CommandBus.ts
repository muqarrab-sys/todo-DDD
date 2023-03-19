import { CommandHandlerMiddleware, ClassNameExtractor, InMemoryLocator, HandleInflector, CommandBus } from 'simple-command-bus';
import AuthCommandHandlers from './Services/Auth/Handlers';
import TodoCommandHandlers from './Services/Todo/Handlers';
import UserCommandHandlers from './Services/User/Handlers';

const handlers = Object.assign({}, AuthCommandHandlers, TodoCommandHandlers, UserCommandHandlers);

const commandHandlerMiddleware = new CommandHandlerMiddleware(new ClassNameExtractor(), new InMemoryLocator(handlers), new HandleInflector());

const commandBus = new CommandBus([commandHandlerMiddleware]);

export default commandBus;
