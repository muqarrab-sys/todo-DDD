import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ITodoModel } from '../../domain/todo/types';

const todoSchema = new Schema<ITodoModel>({
  _id: { type: String, default: uuidv4() },
  title: String,
  description: String,
  userId: String,
  active: { type: Boolean, default: true },
});

export default model<ITodoModel>('Todo', todoSchema);
