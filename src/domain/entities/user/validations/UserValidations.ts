import { GenderEnum, IGoogleCodeValidation, IUserCredentialsValidation, IUserValidation } from '@/domain/entities/user/types';
import Email from '@/domain/ValueObjects/Email';
import Password from '@/domain/ValueObjects/Password';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, ValidateNested } from 'class-validator';

export class UserCreationValidation implements IUserValidation {
  @IsString() name: string;
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
  @IsString() @IsEnum(GenderEnum) gender: GenderEnum;
  @Type(() => Date) @IsDate() dob: Date;
}

export class UserCredentialsValidation implements IUserCredentialsValidation {
  @Transform(({ value }) => new Email(value)) @ValidateNested() email: Email;
  @Transform(({ value }) => new Password(value)) @ValidateNested() password: Password;
}

export class GoogleCodeValidation implements IGoogleCodeValidation {
  @IsString() code: string;
}
