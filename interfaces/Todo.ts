import { IOrderBy, ISearchQuery } from '@interfaces/IQuery';
import { Todo } from '@prisma/client';
import { PartialBy } from '.';

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

export interface TodoFilter extends Partial<Pick<ITodo, 'title' | 'description' | 'isCompleted' | 'dueDate' | 'active'>> {}
