import TodoController from '@/application/controllers/TodoController';
import {
  TodoCreationValidation,
  TodoIdValidation,
  TodoSearchValidation,
  TodoUpdateValidation,
} from '@/domain/entities/todo/validations/TodoValidations';
import validate from '../middleware/validationMiddleware';
import BaseRouter from './base/BaseRouter';

class TodoRouter extends BaseRouter<TodoController> {
  constructor() {
    super(TodoController);
  }

  protected routes(): void {}

  protected protectedRoutes(): void {
    this.post('/todo', validate(TodoCreationValidation), this.controller.create);
    this.get('/todo', validate(TodoSearchValidation, 'query', { skipMissingProperties: true }), this.controller.findByUser);
    this.get('/todo/:id', validate(TodoIdValidation, 'params'), this.controller.find);
    this.delete('/todo/:id', validate(TodoIdValidation, 'params'), this.controller.delete);
    this.put(
      '/todo/:id',
      validate(TodoIdValidation, 'params'),
      validate(TodoUpdateValidation, 'body', { skipMissingProperties: true }),
      this.controller.update,
    );
  }
}

export default TodoRouter;
