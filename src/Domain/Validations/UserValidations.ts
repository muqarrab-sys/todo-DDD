import { GenderEnum, GoogleCodeObject, UserCredentialObject, UserInputObject, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsString, Length, ValidateNested } from 'class-validator';

export class UserCreationValidation implements UserInputObject {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() @Length(8) password: string;
  @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @Type(() => Date) @IsDate() dob: Date;
}

export class UserCredentialsValidation implements UserCredentialObject {
  @IsEmail() email: string;
  @IsString() password: string;
}

export class GoogleCodeValidation implements GoogleCodeObject {
  @IsString() code: string;
}

export class UserUpdateValidation implements UserUpdateObject {
  @IsString() name: string;
  @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @Type(() => Date) @IsDate() dob: Date;
}

export class UserUpdatePasswordValidation implements UserUpdatePasswordObject {
  @IsString() @Length(8) oldPassword: string;
  @IsString() @Length(8) newPassword: string;
  @IsString() @Length(8) confirmPassword: string;
}
