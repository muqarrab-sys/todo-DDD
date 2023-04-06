import { PartialBy } from '@interfaces/index';
import { User } from '@prisma/client';
import { WhereUniqueQuery } from './IQuery';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IUser extends User {
  id: number;
  uid: string;
  name: string;
  email: string;
  password: string;
  dob: Date;
  gender: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserInput = PartialBy<IUser, 'id' | 'uid' | 'name' | 'dob' | 'gender' | 'password' | 'googleId' | 'createdAt' | 'updatedAt'>;

export type UserPartial = Partial<IUser>;

export type UserInputObject = Pick<IUser, 'name' | 'email' | 'password' | 'gender' | 'dob'>;

export type UserCredentialObject = Pick<IUser, 'email' | 'password'>;

export type UserUpdateObject = Pick<IUser, 'name' | 'gender' | 'dob'>;

export type UserUpdatePasswordObject = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type GoogleCodeObject = {
  code: string;
};

export type ReturnableUser = Omit<IUser, 'password' | 'googleId'>;

export interface UserWhereUniqueQuery extends WhereUniqueQuery {
  email?: string;
}
