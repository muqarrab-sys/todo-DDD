import { Omit } from 'lodash';
import { Document } from 'mongoose';

export declare interface ITodo {
  id?: string;
  title: string;
  description: string;
  userId: string;
  active: boolean;
}

export interface ITodoModel extends Omit<ITodo, 'id'> {
  _id?: string;
}

export type TodoDoc = Document<string, any, ITodo> & ITodo;

export declare interface ITodoCreation extends Omit<ITodo, 'id'> {}
