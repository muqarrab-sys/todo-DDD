import Email from '@Domain/ValueObjects/Email';
import Password from '@Domain/ValueObjects/Password';
import { PartialBy } from '@interfaces/index';
import { User } from '@prisma/client';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IUser {
  id: number;
  uid: string;
  name: string;
  email: Email;
  password: Password;
  dob: Date;
  gender: GenderEnum;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends User {}

export type UserInput = PartialBy<IUserModel, 'id' | 'dob' | 'gender' | 'password' | 'googleId' | 'createdAt' | 'updatedAt'>;

export type UserPartial = Partial<IUserModel>;

export type UserInputObject = Pick<IUser, 'name' | 'email' | 'password' | 'gender' | 'dob'>;

export type UserCredentialObject = Pick<IUser, 'email' | 'password'>;

export type UserUpdateObject = Pick<IUser, 'name' | 'gender' | 'dob'>;

export type UserUpdatePasswordObject = {
  oldPassword: Password;
  newPassword: Password;
  confirmPassword: Password;
};

export type GoogleCodeObject = {
  code: string;
};
