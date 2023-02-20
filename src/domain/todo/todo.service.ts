import TodoRepository from '@/infra/persistence/todo.repository';
import { ITodo } from './todo.model';

class TodoService {
  private repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  }

  async create(todoObj: ITodo) {
    return await this.repository.create(todoObj);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async findByUserId(userId: string) {
    return await this.repository.findByUserId(userId);
  }

  async update(id: string, todoObj: ITodo) {
    this.repository.update(id, todoObj);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}

export default TodoService;
