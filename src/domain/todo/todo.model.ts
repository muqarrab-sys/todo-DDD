import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ITodo {
  _id?: string;
  title: string;
  description: string;
  userId: string;
  active: boolean;
}

const todoSchema = new Schema<ITodo>({
  _id: { type: String, default: uuidv4() },
  title: String,
  description: String,
  userId: String,
  active: { type: Boolean, default: true },
});

export default model<ITodo>('Todo', todoSchema);
