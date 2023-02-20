import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type IGender = 'MALE' | 'FEMALE' | 'OTHER';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  gender: IGender;
  dob: Date;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, default: uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
  dob: Date,
});

export default model<IUser>('User', userSchema);
