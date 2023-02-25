import TodoController from '@/application/controllers/TodoController';
import { TodoCreationValidation, TodoFindValidation } from '@/domain/entities/todo/validations/TodoValidations';
import validate from '../middleware/validationMiddleware';
import BaseRouter from './base/BaseRouter';

class TodoRouter extends BaseRouter<TodoController> {
  constructor() {
    super(TodoController);
  }

  protected routes(): void {}

  protected protectedRoutes(): void {
    this.post('/todo', validate(TodoCreationValidation), this.controller.create);
    this.get('/todo/:id', validate(TodoFindValidation), this.controller.find);
  }
}

export default TodoRouter;
