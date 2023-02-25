import { Todo } from '@prisma/client';

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
  isCompleted: boolean;
  dueDate: Date;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPrismaTodo extends Todo {}

export interface ITodoValidationObject {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
}

export interface ITodoSearchObject {
  page: number;
  limit: number;
}
