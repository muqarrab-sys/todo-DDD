import { IPaginationQuery } from '@/application/utils/Pagination';
import ITodoRepository from '@/domain/entities/todo/repository/ITodoRepository';
import { ITodo, TodoOrderByInput, TodoPartial, TodoUpdateObject } from '@/domain/entities/todo/types';
import { Prisma } from '@prisma/client';
import PrismaDatabase from '../database/prisma/PrismaDatabase';

class TodoRepository implements ITodoRepository {
  private todo: Prisma.TodoDelegate<{}>;

  constructor() {
    this.todo = new PrismaDatabase().getClient().todo;
  }

  async create(data: ITodo) {
    return await this.todo.create({
      data: {
        uid: data.uid,
        title: data.title,
        description: data.description,
        isCompleted: data.isCompleted,
        dueDate: data.dueDate,
        userId: data.userId,
      },
    });
  }

  async find(id: number) {
    return await this.todo.findUnique({ where: { id } });
  }

  async findMany(userId: number, pagination?: IPaginationQuery, where?: TodoPartial, orderBy?: TodoOrderByInput) {
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

  async count(userId: number, where?: TodoPartial) {
    return await this.todo.count({
      where: {
        AND: {
          userId,
          ...where,
        },
      },
    });
  }

  async delete(id: number) {
    return await this.todo.delete({ where: { id } });
  }

  async update(id: number, data: TodoUpdateObject) {
    return await this.todo.update({ where: { id }, data });
  }
}

export default TodoRepository;
