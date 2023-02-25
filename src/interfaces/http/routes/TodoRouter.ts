import TodoController from '@/application/controllers/TodoController';
import BaseRouter from './base/BaseRouter';

class TodoRouter extends BaseRouter<TodoController> {
  constructor() {
    super(TodoController);
  }

  protected routes(): void {}

  protected protectedRoutes(): void {}
}

export default TodoRouter;
