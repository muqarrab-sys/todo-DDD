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
  password?: Password;
  gender?: GenderEnum;
  dob?: Date;
  accessToken?: string;
  googleId?: string;
}

export declare interface IUserModelObject extends Omit<IUser, 'id' | 'email' | 'password'> {
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
