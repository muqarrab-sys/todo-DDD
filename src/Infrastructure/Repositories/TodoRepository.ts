import ITodoRepository from '@Domain/Entities/Todo/ITodoRepository';
import { NotFoundException } from '@Infrastructure/Exceptions';
import Symbols from '@Infrastructure/IoC/Symbols';
import { IDatabaseClient } from '@interfaces/IDatabaseClient';
import { IPaginationQuery } from '@interfaces/IQuery';
import { ITodo, TodoOrderByInput, TodoUserInput } from '@interfaces/Todo';
import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
class TodoRepository implements ITodoRepository {
  private todo: Prisma.TodoDelegate<{}>;
  private client: PrismaClient;

  constructor(@inject(Symbols.PrismaDatabase) private db: IDatabaseClient) {
    this.client = db.client;
    this.todo = this.client?.todo;
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

  async count(where?: Prisma.TodoWhereInput) {
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
