import { ITodo, ITodoModelObject, TodoDoc } from './types';

class Todo implements ITodo {
  id: string;
  title: string;
  description: string;
  userId: string;
  active: boolean;

  constructor(id: string, title: string, description: string, userId: string, active: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.active = active;
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

  static create(obj: ITodoModelObject) {
    const todo = new Todo(obj._id, obj.title, obj.description, obj.userId, obj.active);

    return todo;
  }
}

export default Todo;
