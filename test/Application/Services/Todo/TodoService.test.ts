import { stub } from 'sinon';
import { ITodo } from '../../../../interfaces/todo';
import Todo from '../../../../src/Domain/Entities/Todo';
import TodoService from '../../../../src/Application/Todo/TodoServices';
import TodoRepository from '../../../../src/Infrastructure/Repositories/TodoRepository';
import { assert, expect } from 'chai';
import SharedUtils from '../../../../src/Infrastructure/Utils/SharedUtils';
import MockDatabase from '../../../Mock/MockDatabase';

describe('Todo Service', () => {
  let todo: ITodo;
  let todoRepo: TodoRepository;
  let service: TodoService;

  before(() => {
    todo = Todo.create({
      uid: SharedUtils.uuid(),
      title: 'test',
      description: 'test todo',
      isCompleted: false,
      dueDate: new Date(),
      userId: 'xxxx-xxxx-xxxx-xxxx',
    });

    todoRepo = new TodoRepository(new MockDatabase());
    service = new TodoService(todoRepo);
  });

  it('creates a todo and returns Todo entity', async () => {
    const stubCreate = stub(todoRepo, 'create').returns(new Promise(res => res(todo)));

    const response = await service.create(todo);

    assert.isTrue(stubCreate.calledOnce);
    expect(response.uid).eq(todo.uid);
  });

  it('it finds a todo by id and userId and returns it', async () => {
    const stubFind = stub(todoRepo, 'find').returns(new Promise(res => res(todo)));

    const response = await service.find(todo.uid, todo.userId);

    assert.isTrue(stubFind.calledOnce);
    expect(response.uid).eq(todo.uid);
    expect(response.userId).eq(todo.userId);
  });

  it('finds todos by userId and returns an array of todos and total count for that user', async () => {
    const stubFindManyRepo = stub(todoRepo, 'findMany').returns(new Promise(res => res({ todos: [todo], count: 1 })));

    const response = await service.findByUser(todo.userId);

    assert.isTrue(stubFindManyRepo.calledOnce, 'stub 1 not called');
    expect(response.todos.length).eq(1, 'Unexpected length of the array');
    expect(response.count).eq(1, 'unexpected total count');
  });
});
