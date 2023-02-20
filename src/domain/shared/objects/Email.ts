import { IsEmail } from 'class-validator';

export default class Email {
  @IsEmail() private email: string;

  constructor(email: string) {
    this.email = email;
  }

  get value(): string {
    return this.email;
  }
}
