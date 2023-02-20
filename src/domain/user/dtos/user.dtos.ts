import Email from '@domain/shared/objects/Email';
import Password from '@domain/shared/objects/Password';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, ValidateNested } from 'class-validator';
import { IUser } from '@domain/user/types';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class UserCreationDto implements IUser {
  @IsString() name: string;
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
  @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @Type(() => Date) @IsDate() dob: Date;
}
