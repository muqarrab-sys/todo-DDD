import TodoService from '@/domain/todo/todo.service';
import { IHandler } from '../interfaces/express';

class TodoController {
  todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  find: IHandler = async (req, res, next) => {
    const { id } = req.params;

    const todo = await this.todoService.findById(id);

    res.status(200).json({ data: todo });
  };

  index: IHandler = async (req, res, next) => {};

  create: IHandler = async (req, res, next) => {
    const todoObj = req.body;

    const todo = await this.todoService.create(todoObj);

    res.status(201).json({ success: true, data: todo });
  };
}

export default TodoController;
