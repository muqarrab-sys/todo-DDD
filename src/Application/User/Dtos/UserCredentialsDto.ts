import { UserCredentialObject } from '@interfaces/User';
import { IsEmail, IsString } from 'class-validator';

export default class UserCredentialsDto implements UserCredentialObject {
  @IsEmail() email: string;
  @IsString() password: string;
}
