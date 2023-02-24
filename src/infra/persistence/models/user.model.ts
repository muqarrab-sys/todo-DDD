import UniqId from '@/infra/services/uniqId';
import { GenderEnum, IUserModelObject } from '@domain/user/types';
import ModelFactory from './ModelFactory';

const model = new ModelFactory<IUserModelObject>('User', {
  _id: { type: String },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  gender: { type: String, enum: GenderEnum },
  dob: Date,
  accessToken: { type: String, default: null },
  googleId: { type: String, default: null },
});

export default model.create();
