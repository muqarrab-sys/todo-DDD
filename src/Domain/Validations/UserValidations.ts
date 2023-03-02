import { GenderEnum, GoogleCodeObject, UserCredentialObject, UserInputObject, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';
import Email from '@Domain/ValueObjects/Email';
import Password from '@Domain/ValueObjects/Password';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, ValidateNested } from 'class-validator';

export class UserCreationValidation implements UserInputObject {
  @IsString() name: string;
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
  @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @Type(() => Date) @IsDate() dob: Date;
}

export class UserCredentialsValidation implements UserCredentialObject {
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
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
  @Transform(({ value }) => new Password(value)) @ValidateNested() oldPassword: Password;
  @Transform(({ value }) => new Password(value)) @ValidateNested() newPassword: Password;
  @Transform(({ value }) => new Password(value)) @ValidateNested() confirmPassword: Password;
}
