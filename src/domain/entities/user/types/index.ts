import Email from '@/domain/ValueObjects/Email';
import Password from '@/domain/ValueObjects/Password';
import { Omit } from 'lodash';
import { User } from '@prisma/client';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IUser {
  id?: number;
  uid?: string;
  name: string;
  email: Email;
  password?: Password;
  dob?: Date;
  gender?: GenderEnum;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserModel {
  id?: number;
  uid?: string;
  name: string;
  email: string;
  password: string;
  dob?: Date;
  gender?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPrismaUser extends User {}

export interface IUserValidation extends Omit<IUser, 'id' | 'uid' | 'createdAt' | 'updatedAt'> {}

export interface IUserCredentialsValidation {
  email: Email;
  password: Password;
}

export interface IGoogleCodeValidation {
  code: string;
}
