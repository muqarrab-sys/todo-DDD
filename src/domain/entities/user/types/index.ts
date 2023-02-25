import Email from '@/domain/ValueObjects/Email';
import Password from '@/domain/ValueObjects/Password';
import { Omit } from 'lodash';
import { User } from '@prisma/client';
export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export declare interface IUser {
  id: number;
  uid: string;
  name: string;
  email: Email;
  password: Password;
  dob: Date;
  gender: GenderEnum;
  createdAt: Date;
  updatedAt: Date;
}

export declare interface IUserModel {
  id?: number;
  uid: string;
  name: string;
  email: string;
  password: string;
  dob?: Date;
  gender?: GenderEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export declare interface IUserValidationObject extends Omit<IUser, 'id' | 'uid' | 'createdAt' | 'updatedAt'> {}

export declare interface IUserCredentialsValidation {
  email: Email;
  password: Password;
}

export declare interface IPrismaUser extends User {}
