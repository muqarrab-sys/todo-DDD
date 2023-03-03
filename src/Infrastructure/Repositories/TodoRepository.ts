import ITodoRepository from '@Domain/Entities/Todo/Repository/ITodoRepository';
import { IPaginationQuery } from '@Infrastructure/Utils/Pagination';
import { ITodo, TodoOrderByInput, TodoPartial, TodoUpdateObject } from '@interfaces/todo';
import { Prisma } from '@prisma/client';
import PrismaDatabase from '../Database/Prisma/PrismaDatabase';

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

  async findMany(userId: string, where?: TodoPartial, pagination?: IPaginationQuery, orderBy?: TodoOrderByInput) {
    return await this.todo.findMany({
      where: {
        AND: {
          userId,
          ...where,
        },
      },
      orderBy,
      ...pagination,
    });
  }

  async count(userId: string, where?: TodoPartial) {
    return await this.todo.count({
      where: {
        AND: {
          userId,
          ...where,
        },
      },
    });
  }

  async delete(uid: string) {
    return await this.todo.delete({ where: { uid } });
  }

  async update(uid: string, data: TodoUpdateObject) {
    return await this.todo.update({ where: { uid }, data });
  }
}

export default TodoRepository;
