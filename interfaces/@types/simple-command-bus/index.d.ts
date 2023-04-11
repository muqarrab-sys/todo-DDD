declare module 'simple-command-bus' {
  export class Command {}

  export class CommandBus {
    constructor(commandHandlerMiddleware: CommandHandlerMiddleware);

    getMiddlewareStack(): CommandHandlerMiddleware[];

    handle<T = any>(command: Command): T;
  }

  export class CommandHandlerMiddleware {
    constructor(commandNameExtractor: ClassNameExtractor, handlerLocator: InMemoryLocator, methodNameInflector: HandleInflector);
  }

  export class ClassNameExtractor {}

  export class InMemoryLocator {
    constructor(handlers: Object);
  }

  export class HandleInflector {}
}
