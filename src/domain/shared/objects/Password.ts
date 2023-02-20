import { IsString, Length } from 'class-validator';
import BCrypt from '@/domain/shared/encryption/bcrypt';

export default class Password {
  @IsString() @Length(8) private password: string;
  private encoded: string;

  constructor(password: string) {
    this.password = password;
  }

  get value(): string {
    return this.password;
  }

  get encodedValue(): string {
    if (!this.encoded) {
      throw new Error('Password is not encoded yet');
    }

    return this.encoded;
  }

  async encode(): Promise<string> {
    const encrypt = new BCrypt();
    this.encoded = await encrypt.encrypt(this.password);
    return this.encoded;
  }

  async compare(hash: string): Promise<boolean> {
    const encrypt = new BCrypt();
    return await encrypt.compare(this.password, hash);
  }
}
