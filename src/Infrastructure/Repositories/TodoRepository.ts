import ITodoRepository from '@Domain/Entities/Todo/Repository/ITodoRepository';
import { IPaginationQuery } from '@Infrastructure/Utils/Pagination';
import { ITodo, TodoOrderByInput, TodoUserInput } from '@interfaces/todo';
import { Prisma } from '@prisma/client';
import { Service } from 'typedi';
import PrismaDatabase from '../Database/Prisma/PrismaDatabase';

@Service()
class TodoRepository implements ITodoRepository {
  private todo: Prisma.TodoDelegate<{}>;

  constructor() {
    this.todo = new PrismaDatabase().getClient().todo;
  }

  async create(data: ITodo) {
    return await this.todo.create({ data });
  }

  async find(where) {
    return await this.todo.findUnique({ where });
  }

  async findMany(where?: Partial<ITodo>, pagination?: IPaginationQuery, orderBy?: TodoOrderByInput) {
    return await this.todo.findMany({
      where,
      orderBy,
      ...pagination,
    });
  }

  async count(userId: string, where?: Partial<ITodo>) {
    return await this.todo.count({ where });
  }

  async delete(uid: string) {
    return await this.todo.delete({ where: { uid } });
  }

  async update(uid: string, data: Partial<TodoUserInput>) {
    return await this.todo.update({ where: { uid }, data });
  }
}

export default TodoRepository;
