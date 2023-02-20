import Email from '@domain/shared/objects/Email';
import Password from '@domain/shared/objects/Password';
import { Transform } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class UserCredentialsDto {
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
}
