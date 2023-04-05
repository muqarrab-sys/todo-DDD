import { CommandHandlerMiddleware, ClassNameExtractor, InMemoryLocator, HandleInflector, CommandBus } from 'simple-command-bus';
import AuthCommandHandlers from './Auth/Handlers';
import TodoCommandHandlers from './Todo/Handlers';
import UserCommandHandlers from './User/Handlers';

const handlers = Object.assign({}, AuthCommandHandlers, TodoCommandHandlers, UserCommandHandlers);

const commandHandlerMiddleware = new CommandHandlerMiddleware(new ClassNameExtractor(), new InMemoryLocator(handlers), new HandleInflector());

const commandBus = new CommandBus([commandHandlerMiddleware]);

export default commandBus;
