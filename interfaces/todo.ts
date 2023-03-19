import { IOrderBy, ISearchQuery, PartialBy } from '@interfaces/index';
import { Todo } from '@prisma/client';

export interface ITodo extends Todo {
  id: number;
  uid: string;
  title: string;
  description: string;
  active: boolean;
  isCompleted: boolean;
  dueDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoUserInput = Pick<ITodo, 'title' | 'description' | 'isCompleted' | 'dueDate'>;

export type TodoCreationObject = PartialBy<TodoUserInput, 'isCompleted'>;

export interface ITodoSearchObject extends ISearchQuery<ITodo> {
  isCompleted?: boolean;
}

export type TodoAttributes = keyof ITodo;

export type TodoOrderByInput = Partial<IOrderBy<ITodo>>;
