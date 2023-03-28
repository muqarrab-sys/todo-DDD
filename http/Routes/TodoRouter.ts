import { TodoCreationDto, TodoIdDto, TodoSearchDto, TodoUpdateDto } from '@Application/Dto/TodoDto';
import TodoController from '@http/Controllers/TodoController';
import Validate from '../Middleware/ValidationMiddleware';
import BaseRouter from './Base/BaseRouter';

class TodoRouter extends BaseRouter<TodoController> {
  constructor() {
    super(TodoController);
  }

  // TODO: Implement more routes:
  // route: '/todo/completed'
  // route: '/todo/active'
  // route: '/todo/complete'
  // route: '/todo/clear_completed'
  // route: '/todo/clear_all'
  // route: '/todo/history'
  // route: '/todo/clear_history'
  protected protectedRoutes(): void {
    this.post('/todo', Validate(TodoCreationDto), this.controller.create);
    this.get('/todo', Validate(TodoSearchDto, 'query', { skipMissingProperties: true }), this.controller.findByUser);
    this.get('/todo/:uid', Validate(TodoIdDto, 'params'), this.controller.find);
    this.delete('/todo/:uid', Validate(TodoIdDto, 'params'), this.controller.delete);
    this.put('/todo/:uid', Validate(TodoIdDto, 'params'), Validate(TodoUpdateDto, 'body', { skipMissingProperties: true }), this.controller.update);
  }
}

export default TodoRouter;
