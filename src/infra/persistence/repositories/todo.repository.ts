import ITodoRepository from '@/domain/todo/repository/ITodoRepository';
import { ITodoModelObject } from '@/domain/todo/types';
import TodoModel from '@/infra/persistence/models/todo.model';

class TodoRepository implements ITodoRepository {
  async create(todoObj: ITodoModelObject) {
    const todo = new TodoModel(todoObj);
    return await todo.save();
  }

  async find(id: string) {
    return await TodoModel.findById(id);
  }

  async searchByUserId(userId: string) {
    return await TodoModel.where({ userId });
  }

  async update(id: string, todoObj: ITodoModelObject) {
    return await TodoModel.findByIdAndUpdate(id, todoObj);
  }

  async delete(id: string) {
    return await TodoModel.findByIdAndDelete(id);
  }
}

export default TodoRepository;
