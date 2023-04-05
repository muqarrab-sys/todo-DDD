import { GenderEnum, UserInputObject } from '@interfaces/user';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export default class UserCreationDto implements UserInputObject {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() @Length(8) password: string;
  @IsOptional() @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @IsOptional() @Type(() => Date) @IsDate() dob: Date;
}
