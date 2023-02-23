import { IGoogleUser, IUserModel } from '@domain/user/types';
import { v4 as uuidv4 } from 'uuid';
import ModelFactory from './ModelFactory';

const model = new ModelFactory<IUserModel>('User', {
  _id: { type: String, default: uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
  dob: Date,
  accessToken: { type: String, default: null },
  googleId: { type: String, default: null },
});

export default model.create();
