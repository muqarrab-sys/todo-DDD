import TodoService from './todo.service';
import { ITodo, ITodoCreation, TodoDoc } from './types';

class Todo implements ITodo {
  id: string;
  title: string;
  description: string;
  userId: string;
  active: boolean;

  private model: TodoDoc;
  private service: TodoService;

  constructor(obj: TodoDoc) {
    this.id = obj._id;
    this.title = obj.title;
    this.description = obj.description;
    this.userId = obj.userId;
    this.active = obj.active;
    this.model = obj;

    this.service = new TodoService();
  }

  async update(obj: ITodoCreation) {
    return await this.service.update(this.id, obj);
  }

  get values(): ITodo {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      userId: this.userId,
      active: this.active,
    };
  }
}

export default Todo;
