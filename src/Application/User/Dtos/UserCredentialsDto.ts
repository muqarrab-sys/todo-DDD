import { UserCredentialObject } from '@interfaces/user';
import { IsEmail, IsString } from 'class-validator';

export default class UserCredentialsDto implements UserCredentialObject {
  @IsEmail() email: string;
  @IsString() password: string;
}
