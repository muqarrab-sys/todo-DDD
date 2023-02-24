import ITodoRepository from '@/domain/todo/repository/ITodoRepository';
import { ITodoModelObject } from '@/domain/todo/types';
import TodoModel from '@/infra/persistence/models/todo.model';
import UniqId from '@/infra/services/uniqId';

class TodoRepository implements ITodoRepository {
  async create(todoObj: ITodoModelObject) {
    todoObj._id = new UniqId().generate();
    const todo = new TodoModel(todoObj);
    return await todo.save();
  }

  async find(id: string) {
    return await TodoModel.findById(id);
  }

  async search(userId: string) {
    return await TodoModel.where({ userId });
  }

  async paginatedSearch(userId: string, page: number = 2, limit: number = 10) {
    const skip = limit * (page - 1);

    return await TodoModel.find({ userId }, {}, { skip, limit });
  }

  async update(id: string, todoObj: ITodoModelObject) {
    return await TodoModel.findByIdAndUpdate(id, todoObj);
  }

  async delete(id: string) {
    return await TodoModel.findByIdAndDelete(id);
  }
}

export default TodoRepository;
