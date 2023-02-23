import Todo from '@/domain/todo';
import ITodoRepository from '@/domain/todo/repository/ITodoRepository';

class SearchTodos {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const todos = await this.repository.searchByUserId(id);

    return todos.map(todo => Todo.create(todo));
  }
}

export default SearchTodos;
