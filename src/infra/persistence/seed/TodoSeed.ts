import ITodoRepository from '@/domain/todo/repository/ITodoRepository';
import { ITodoModelObject } from '@/domain/todo/types';
import { faker } from '@faker-js/faker';
import BaseSeed from './base/BaseSeed';

export default class TodoSeed extends BaseSeed<ITodoRepository> {
  constructor(repository: ITodoRepository) {
    super(repository);
  }

  async execute(num: number) {
    for (let i = 0; i < num; i++) {
      const todoObj: ITodoModelObject = {
        title: faker.random.words(3),
        description: faker.lorem.paragraph(),
        active: true,
        userId: '000605fc-baec-4f4a-9ced-c23485b8bda9',
      };

      const todo = await this.repository.create(todoObj);
      console.log(`${i + 1}: ${todo.id}`);
    }
  }
}
