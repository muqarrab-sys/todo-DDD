import { ITodo, ITodoModelObject } from './types';

class Todo implements ITodo {
  id: string;
  title: string;
  description: string;
  userId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, title: string, description: string, userId: string, active: boolean, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get values(): ITodo {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      userId: this.userId,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static create(obj: ITodoModelObject) {
    const todo = new Todo(obj._id, obj.title, obj.description, obj.userId, obj.active, obj.createdAt, obj.updatedAt);

    return todo;
  }
}

export default Todo;
