import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUserModel } from '../../domain/user/types';

const userSchema = new Schema<IUserModel>({
  _id: { type: String, default: uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
  dob: Date,
});

export default model<IUserModel>('User', userSchema);
