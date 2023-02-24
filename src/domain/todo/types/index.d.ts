import { Omit } from 'lodash';
import { Document } from 'mongoose';

export declare interface ITodo {
  id?: string;
  title: string;
  description: string;
  userId: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export declare interface ITodoModelObject extends Omit<ITodo, 'id'> {
  _id?: string;
}

export declare interface ITodoCreationObject extends Omit<ITodo, 'id' | 'userId'> {
  userId?: string;
}
export declare type TodoDoc = Document<string, any, ITodo> & ITodo;

export declare interface ITodoSearchObject {
  page: number;
  limit: number;
}
