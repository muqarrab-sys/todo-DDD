import Todo from '@/domain/todo';
import ITodoRepository from '@/domain/todo/repository/ITodoRepository';

class PaginatedSearchTodos {
  private repository: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repository = repository;
  }

  async execute(id: string, page: number, limit: number) {
    const todos = await this.repository.paginatedSearch(id, page, limit);

    return todos.map(todo => Todo.create(todo));
  }
}

export default PaginatedSearchTodos;
