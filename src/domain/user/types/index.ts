import Email from '@/domain/shared/objects/Email';
import Password from '@/domain/shared/objects/Password';
import { Omit } from 'lodash';
import { Document } from 'mongoose';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export declare interface IUser {
  id?: string;
  name: string;
  email: Email;
  password?: Password;
  gender?: GenderEnum;
  dob?: Date;
  accessToken?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export declare interface IUserModelObject extends Omit<IUser, 'id' | 'email' | 'password' | 'createdAt' | 'updatedAt'> {
  _id?: string;
  email: string;
  password?: string;
}

export declare interface IUserCreationObject extends Omit<IUser, 'id'> {}

export declare interface IUserCredentialsObject {
  email: Email;
  password: Password;
}

export declare interface IUserExposed extends Omit<IUser, 'password' | 'email'> {
  email: string;
}

export declare type UserDoc = Document<String, any, IUserModelObject> & IUserModelObject;
