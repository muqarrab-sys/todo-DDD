import ITodoRepository from '@Domain/Entities/Todo/ITodoRepository';
import { NotFoundException } from '@Infrastructure/Exceptions';
import { IPaginationQuery } from '@Infrastructure/Utils/Pagination';
import { ITodo, TodoOrderByInput, TodoUserInput } from '@interfaces/todo';
import { Prisma, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import PrismaDatabase from '../Database/Prisma/PrismaDatabase';

@Service()
class TodoRepository implements ITodoRepository {
  private todo: Prisma.TodoDelegate<{}>;
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaDatabase().getClient();
    this.todo = this.client.todo;
  }

  async create(data: ITodo) {
    return await this.todo.create({ data });
  }

  async find(where: Prisma.TodoWhereUniqueInput) {
    const response = await this.todo.findUnique({ where });
    if (!response) throw new NotFoundException('Todo not found!');
    return response;
  }

  async findMany(where?: Prisma.TodoWhereInput, pagination?: IPaginationQuery, orderBy?: TodoOrderByInput) {
    const [count, todos] = await this.client.$transaction([
      this.todo.count({ where }),
      this.todo.findMany({
        where,
        orderBy,
        ...pagination,
      }),
    ]);

    return { todos, count };
  }

  async count(userId: string, where?: Prisma.TodoWhereInput) {
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
