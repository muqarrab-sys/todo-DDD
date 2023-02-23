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
}

export declare interface IUserModel extends Omit<IUser, 'id' | 'email' | 'password'> {
  _id?: string;
  email: string;
  password: string;
}

export declare interface IUserCreation extends Omit<IUser, 'id'> {}

interface IUserExposed extends Omit<IUser, 'password' | 'email'> {
  email: string;
}

export declare type UserDoc = Document<String, any, IUserModel> & IUserModel;

export declare interface IGoogleUser extends IUser {
  accessToken: string;
  googleId: string;
}

export declare interface IGoogleUserModel extends Omit<IGoogleUser, 'id' | 'email' | 'password'> {
  _id?: string;
  email: string;
  password: string;
}
