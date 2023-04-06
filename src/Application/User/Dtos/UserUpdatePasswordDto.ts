import { UserUpdatePasswordObject } from '@interfaces/User';
import { IsString, Length } from 'class-validator';

export default class UserUpdatePasswordDto implements UserUpdatePasswordObject {
  @IsString() @Length(8) oldPassword: string;
  @IsString() @Length(8) newPassword: string;
  @IsString() @Length(8) confirmPassword: string;
}
