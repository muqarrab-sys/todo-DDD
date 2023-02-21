import TodoRepository from '@/infra/persistence/repositories/todo.repository';
import { ITodoCreation } from './types';

class TodoService {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async create(todoObj: ITodoCreation) {
    return await this.repository.create(todoObj);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async findByUserId(userId: string) {
    return await this.repository.findByUserId(userId);
  }

  async update(id: string, todoObj: ITodoCreation) {
    this.repository.update(id, todoObj);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}

export default TodoService;
