import UniqId from '@/infra/services/uniqId';
import { ITodoModelObject } from '@domain/todo/types';
import ModelFactory from './ModelFactory';

const model = new ModelFactory<ITodoModelObject>('Todo', {
  _id: { type: String },
  title: String,
  description: String,
  userId: String,
  active: { type: Boolean, default: true },
});

export default model.create();
