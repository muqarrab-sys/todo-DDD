import { SortOrder } from '@/interfaces';
import { Prisma, Todo } from '@prisma/client';

export interface ITodo {
  id: number;
  uid: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodoModel {
  id?: number;
  uid: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  dueDate: Date;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITodoUpdate {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: Date;
}

export interface IPrismaTodo extends Todo {}

export interface ITodoValidationObject {
  title: string;
  description: string;
  dueDate: Date;
}

export interface ITodoIdValidationObject {
  id: number;
}

export interface ITodoSearchObject {
  page?: number;
  limit?: number;
  isCompleted?: boolean;
  orderBy?: ITodoOrderBy;
  sortBy?: SortOrder;
}

export interface ITodoUpdateValidationObject {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: Date;
}

export type ITodoOrderBy = keyof TodoOrderByWithRelationInput;

export interface TodoOrderByWithRelationInput extends Prisma.TodoOrderByWithRelationInput {}
