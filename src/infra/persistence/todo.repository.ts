import { ITodoCreation } from '@/domain/todo/types';
import Todo from '@/infra/models/todo.model';
import { QueryOptions } from 'mongoose';

class TodoRepository {
  async create(todoObj: ITodoCreation) {
    const todo = new Todo(todoObj);
    return await todo.save();
  }

  async findByUserId(userId: string) {
    return await Todo.where({ userId });
  }

  async findById(id: string) {
    return await Todo.findById(id);
  }

  async update(id: string, todoObj: ITodoCreation, options?: QueryOptions<ITodoCreation>) {
    return await Todo.findByIdAndUpdate(id, todoObj, options);
  }

  async delete(id: string) {
    return await Todo.findByIdAndDelete(id);
  }
}

export default TodoRepository;
