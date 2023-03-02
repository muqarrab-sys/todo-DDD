import { ITodo, TodoInput } from '@interfaces/todo';

class Todo implements ITodo {
  id: number;
  uid: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    uid: string,
    title: string,
    description: string,
    isCompleted: boolean,
    dueDate: Date,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get values(): ITodo {
    return {
      id: this.id,
      uid: this.uid,
      title: this.title,
      description: this.description,
      isCompleted: this.isCompleted,
      dueDate: this.dueDate,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static create(obj: TodoInput) {
    const todo = new Todo(
      obj.id,
      obj.uid,
      obj.title,
      obj.description,
      obj.isCompleted || false,
      obj.dueDate,
      obj.userId,
      obj.createdAt,
      obj.updatedAt,
    );

    return todo;
  }

  static createFromDetails(obj: ITodo) {
    const todo = new Todo(obj.id, obj.uid, obj.title, obj.description, obj.isCompleted, obj.dueDate, obj.userId, obj.createdAt, obj.updatedAt);

    return todo;
  }
}

export default Todo;
