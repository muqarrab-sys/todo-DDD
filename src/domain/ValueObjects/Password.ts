import { InternalServerException } from '@/application/exceptions';
import BCrypt from '@/infrastructure/utils/BCrypt';
import { IsString, Length } from 'class-validator';

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
      throw new InternalServerException('Password is not encoded');
    }

    return this.encoded;
  }

  async encode(): Promise<string> {
    const encryption = new BCrypt();
    this.encoded = await encryption.encrypt(this.password);
    return this.encoded;
  }

  async compare(hash: string): Promise<boolean> {
    const encryption = new BCrypt();
    return await encryption.compare(this.password, hash);
  }
}
