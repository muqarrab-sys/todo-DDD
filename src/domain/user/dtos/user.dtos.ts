import Email from '@domain/shared/objects/Email';
import Password from '@domain/shared/objects/Password';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Omit } from 'lodash';
import { IGender, IUser } from '../user.model';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface IUserDto extends Omit<IUser, 'email' | 'password'> {
  email: Email;
  password: Password;
}

export class UserCreationDto implements IUserDto {
  @IsString() name: string;
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
  @IsString() @IsEnum(GenderEnum) gender: IGender;
  @Type(() => Date) @IsDate() dob: Date;
}
