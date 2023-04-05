import CreateTodoHandler from './CreateTodoHandler';
import FindTodoHandler from './FindTodoHandler';
import FindManyTodoHandler from './FindManyTodoHandler';
import DeleteTodoHandler from './DeleteTodoHandler';
import UpdateTodoHandler from './UpdateTodoHandler';

export default {
  CreateTodoHandler: new CreateTodoHandler(),
  FindTodoHandler: new FindTodoHandler(),
  FindManyTodoHandler: new FindManyTodoHandler(),
  DeleteTodoHandler: new DeleteTodoHandler(),
  UpdateTodoHandler: new UpdateTodoHandler(),
};
