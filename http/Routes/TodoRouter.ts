import TodoController from '@http/Controllers/TodoController';
import { TodoCreationValidation, TodoIdValidation, TodoSearchValidation, TodoUpdateValidation } from '@Domain/Validations/TodoValidations';
import validate from '../Middleware/validationMiddleware';
import BaseRouter from './Base/BaseRouter';

class TodoRouter extends BaseRouter<TodoController> {
  constructor() {
    super(TodoController);
  }

  protected routes(): void {}

  // TODO: Implement more routes:
  // route: '/todo/completed'
  // route: '/todo/active'
  // route: '/todo/complete'
  // route: '/todo/clear_completed'
  // route: '/todo/clear_all'
  // route: '/todo/history'
  // route: '/todo/clear_history'
  protected protectedRoutes(): void {
    this.post('/todo', validate(TodoCreationValidation), this.controller.create);
    this.get('/todo', validate(TodoSearchValidation, 'query', { skipMissingProperties: true }), this.controller.findByUser);
    this.get('/todo/:uid', validate(TodoIdValidation, 'params'), this.controller.find);
    this.delete('/todo/:uid', validate(TodoIdValidation, 'params'), this.controller.delete);
    this.put(
      '/todo/:uid',
      validate(TodoIdValidation, 'params'),
      validate(TodoUpdateValidation, 'body', { skipMissingProperties: true }),
      this.controller.update,
    );
  }
}

export default TodoRouter;
