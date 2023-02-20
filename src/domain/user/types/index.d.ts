import Email from '@/domain/shared/objects/Email';
import Password from '@/domain/shared/objects/Password';
import { Omit } from 'lodash';
import { Document } from 'mongoose';

export declare type IGender = 'MALE' | 'FEMALE' | 'OTHER';

export declare interface IUser {
  id?: string;
  name: string;
  email: Email;
  password: Password;
  gender: IGender;
  dob: Date;
}

export declare interface IUserModel extends Omit<IUser, 'id' | 'email' | 'password'> {
  _id?: string;
  email: string;
  password: string;
}

export declare interface IUserCreation extends Omit<IUser, 'id'> {}

export declare type UserDoc = Document<String, any, IUserModel> & IUserModel;
