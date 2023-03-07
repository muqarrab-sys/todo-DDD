import { stub } from 'sinon';
import { ITodo } from '../../../interfaces/todo';
import Todo from '../../../src/Domain/Entities/Todo';
import TodoService from '../../../src/Application/Services/Todo/TodoServices';
import TodoRepository from '../../../src/Infrastructure/Repositories/TodoRepository';
import { assert, expect } from 'chai';
import SharedUtils from '../../../src/Infrastructure/Utils/SharedUtils';

describe('Todo Service', () => {
  let todo: ITodo;

  before(() => {
    todo = Todo.create({
      uid: SharedUtils.uuid(),
      title: 'test',
      description: 'test todo',
      isCompleted: false,
      dueDate: new Date(),
      userId: 'xxxx-xxxx-xxxx-xxxx',
    });
  });

  it('creates a todo and returns Todo entity', async () => {
    const todoRepo = new TodoRepository();
    const stubRepo = stub(todoRepo, 'create').returns(new Promise(res => res(todo)));

    const service = new TodoService(todoRepo);
    const response = await service.create(todo);

    assert.isTrue(stubRepo.calledOnce);
    expect(response.uid).eq(todo.uid);
  });

  it('it finds a todo by id and userId and returns it', async () => {
    const todoRepo = new TodoRepository();
    const stubRepo = stub(todoRepo, 'find').returns(new Promise(res => res(todo)));

    const service = new TodoService(todoRepo);
    const response = await service.find(todo.uid, todo.userId);

    assert.isTrue(stubRepo.calledOnce);
    expect(response.uid).eq(todo.uid);
    expect(response.userId).eq(todo.userId);
  });

  it('finds todos by userId and returns an array of todos and total count for that user', async () => {
    const todoRepo = new TodoRepository();
    const stubFindManyRepo = stub(todoRepo, 'findMany').returns(new Promise(res => res([todo])));
    const stubCountRepo = stub(todoRepo, 'count').returns(new Promise(res => res(1)));

    const service = new TodoService(todoRepo);
    const response = await service.findByUser(todo.userId);

    assert.isTrue(stubFindManyRepo.calledOnce, 'stub 1 not called');
    assert.isTrue(stubCountRepo.calledOnce, 'stub 2 not called');
    expect(response.todos.length).eq(1, 'Unexpected length of the array');
    expect(response.totalTodos).eq(1, 'unexpected total count');
  });
});
