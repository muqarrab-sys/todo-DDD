import { ITodoModel } from '@domain/todo/types';
import { v4 as uuidv4 } from 'uuid';
import ModelFactory from './ModelFactory';

const model = new ModelFactory<ITodoModel>('Todo', {
  _id: { type: String, default: uuidv4() },
  title: String,
  description: String,
  userId: String,
  active: { type: Boolean, default: true },
});

export default model.create();
