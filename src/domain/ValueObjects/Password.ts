import { InternalServerException } from '@/application/exceptions';
import BCrypt from '@/infrastructure/utils/bcrypt';
import { IsString, Length } from 'class-validator';

export default class Password {
  @IsString() @Length(8) private password: string;
  private encoded: string;
  private encryption: BCrypt;

  constructor(password: string) {
    this.password = password;
    this.encryption = new BCrypt();
  }

  get value(): string {
    return this.password;
  }

  get encodedValue(): string {
    if (!this.encoded) {
      throw new InternalServerException('Password is not encoded');
    }

    return this.encoded;
  }

  async encode(): Promise<string> {
    this.encoded = await this.encryption.encrypt(this.password);
    return this.encoded;
  }

  async compare(hash: string): Promise<boolean> {
    return await this.encryption.compare(this.password, hash);
  }
}
