import TodoController from '@http/Controllers/TodoController';
import { TodoCreationValidation, TodoIdValidation, TodoSearchValidation, TodoUpdateValidation } from '@Domain/Validations/TodoValidations';
import Validate from '../Middleware/ValidationMiddleware';
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
    this.post('/todo', Validate(TodoCreationValidation), this.controller.create);
    this.get('/todo', Validate(TodoSearchValidation, 'query', { skipMissingProperties: true }), this.controller.findByUser);
    this.get('/todo/:uid', Validate(TodoIdValidation, 'params'), this.controller.find);
    this.delete('/todo/:uid', Validate(TodoIdValidation, 'params'), this.controller.delete);
    this.put(
      '/todo/:uid',
      Validate(TodoIdValidation, 'params'),
      Validate(TodoUpdateValidation, 'body', { skipMissingProperties: true }),
      this.controller.update,
    );
  }
}

export default TodoRouter;
