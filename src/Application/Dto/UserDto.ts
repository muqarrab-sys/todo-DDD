import { GenderEnum, GoogleCodeObject, UserCredentialObject, UserInputObject, UserUpdateObject, UserUpdatePasswordObject } from '@interfaces/user';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsString, Length, IsOptional, MATCHES } from 'class-validator';

export class UserCreationDto implements UserInputObject {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() @Length(8) password: string;
  @IsOptional() @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @IsOptional() @Type(() => Date) @IsDate() dob: Date;
}

export class UserCredentialsDto implements UserCredentialObject {
  @IsEmail() email: string;
  @IsString() password: string;
}

export class GoogleCodeDto implements GoogleCodeObject {
  @IsString() code: string;
}

export class UserUpdateDto implements UserUpdateObject {
  @IsOptional() @IsString() name: string;
  @IsOptional() @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @IsOptional() @Type(() => Date) @IsDate() dob: Date;
}

export class UserUpdatePasswordDto implements UserUpdatePasswordObject {
  @IsString() @Length(8) oldPassword: string;
  @IsString() @Length(8) newPassword: string;
  @IsString() @Length(8) confirmPassword: string;
}
