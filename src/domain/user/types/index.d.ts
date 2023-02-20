import Email from '@/domain/shared/objects/Email';
import Password from '@/domain/shared/objects/Password';
import { Omit } from 'lodash';
import { Document } from 'mongoose';

export declare enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export declare interface IUser {
  id?: string;
  name: string;
  email: Email;
  password: Password;
  gender: GenderEnum;
  dob: Date;
}

export declare interface IUserModel extends Omit<IUser, 'id' | 'email' | 'password'> {
  _id?: string;
  email: string;
  password: string;
}

export declare interface IUserCreation extends Omit<IUser, 'id'> {}

export declare type UserDoc = Document<String, any, IUserModel> & IUserModel;
