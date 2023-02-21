import { ITodoModel } from '@/domain/todo/types';
import Todo from '@/infra/persistence/models/todo.model';
import { QueryOptions } from 'mongoose';
import BaseRepository from './base/BaseRepository';

class TodoRepository extends BaseRepository<ITodoModel> {
  constructor() {
    super(Todo);
  }

  async create(todoObj: ITodoModel) {
    const todo = new this.model(todoObj);
    return await todo.save();
  }

  async find(id: string) {
    return await this.model.findById(id);
  }

  async findByUserId(userId: string) {
    return await this.model.where({ userId });
  }

  async update(id: string, todoObj: ITodoModel, options?: QueryOptions<ITodoModel>) {
    return await this.model.findByIdAndUpdate(id, todoObj, options);
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default TodoRepository;
