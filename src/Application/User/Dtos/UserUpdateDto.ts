import { GenderEnum, UserUpdateObject } from '@interfaces/user';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export default class UserUpdateDto implements UserUpdateObject {
  @IsOptional() @IsString() name: string;
  @IsOptional() @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @IsOptional() @Type(() => Date) @IsDate() dob: Date;
}
