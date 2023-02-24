import { TodoCreationDto, TodoSearchDto } from '@/domain/todo/dtos/todo.dto';
import TodoController from '../controllers/todo.controller';
import validationMiddleware from '../middleware/validation.middleware';
import AuthorizedRouter from './base/AuthorizedRouter';

class TodoRouter extends AuthorizedRouter<TodoController> {
  constructor(path: string) {
    super(new TodoController(), path);
  }

  protected routes(): void {
    this.post('/', validationMiddleware(TodoCreationDto), this.controller.create);
    this.get('/', validationMiddleware(TodoSearchDto, 'query'), this.controller.search);
  }
}

export default TodoRouter;
