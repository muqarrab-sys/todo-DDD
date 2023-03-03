import { IOrderBy, ISearchQuery, PartialBy } from '@interfaces/index';
import { Todo } from '@prisma/client';

export interface ITodo extends Todo {
  id: number;
  uid: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoInput = PartialBy<ITodo, 'id' | 'uid' | 'isCompleted' | 'createdAt' | 'updatedAt'>;

export type TodoPartial = Partial<ITodo>;

export type TodoUserInput = Pick<ITodo, 'title' | 'description' | 'isCompleted' | 'dueDate'>;

export type TodoCreationObject = PartialBy<TodoUserInput, 'isCompleted'>;

export type TodoUpdateObject = Partial<TodoUserInput>;

export interface ITodoSearchObject extends ISearchQuery<ITodo> {
  isCompleted?: boolean;
}

export type TodoAttributes = keyof ITodo;

export type TodoOrderByInput = Partial<IOrderBy<ITodo>>;
