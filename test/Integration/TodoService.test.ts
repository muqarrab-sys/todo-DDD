import { faker } from '@faker-js/faker';
import { assert } from 'chai';
import { ITodo } from '../../interfaces/todo';
import Todo from '../../src/Domain/Entities/Todo';
import TodoService from '../../src/Domain/Services/Todo/TodoServices';
import { TodoDomainService } from '../../src/Infrastructure/IoC/Containers';
import SharedUtils from '../../src/Infrastructure/Utils/SharedUtils';
import CreateUser from '../Utils/CreateUser';
import Database from '../Utils/Database';

describe('Todo Service Integration', () => {
  let user: CreateUser;
  let database: Database;
  let service: TodoService;

  before(async () => {
    database = new Database();
    service = TodoDomainService as TodoService;
    user = await CreateUser.create();
  });

  after(async () => {
    await database.client.todo.deleteMany();
    user.delete();
    await database.disconnect();
  });

  it('creates todo for the user', async () => {
    const todo = await service.create(createTodo(user));

    assert.exists(todo.uid);
  });

  it('finds all Todos for a user', async () => {
    const CREATE_TODO_AMOUNT = 10;

    const todos: ITodo[] = [];

    for (let i = 0; i < CREATE_TODO_AMOUNT; i++) {
      todos.push(createTodo(user));
    }

    await database.client.todo.createMany({ data: todos });

    const foundTodos = await service.findByUser(user.values.uid);

    assert.isArray(foundTodos.todos);
    assert.isAtLeast(foundTodos.todos.length, CREATE_TODO_AMOUNT);
    assert.equal(foundTodos.todos.length, foundTodos.totalTodos);
  });

  function createTodo(user) {
    return Todo.create({
      uid: SharedUtils.uuid(),
      title: faker.word.verb(),
      description: faker.lorem.paragraph(),
      isCompleted: false,
      dueDate: faker.date.future(),
      userId: user.values.uid,
    });
  }
});
