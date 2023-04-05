import { UserUpdatePasswordObject } from '@interfaces/user';
import { IsString, Length } from 'class-validator';

export default class UserUpdatePasswordDto implements UserUpdatePasswordObject {
  @IsString() @Length(8) oldPassword: string;
  @IsString() @Length(8) newPassword: string;
  @IsString() @Length(8) confirmPassword: string;
}
