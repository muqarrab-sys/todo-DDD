import ITodoRepository from '@/domain/entities/todo/repository/ITodoRepository';
import { ITodoModel } from '@/domain/entities/todo/types';
import { Prisma } from '@prisma/client';
import PrismaDatabase from '../database/prisma/PrismaDatabase';

class TodoRepository implements ITodoRepository {
  private model: Prisma.TodoDelegate<{}>;

  constructor() {
    this.model = new PrismaDatabase().getClient().todo;
  }

  async create(data: ITodoModel) {
    return await this.model.create({ data });
  }
}

export default TodoRepository;
