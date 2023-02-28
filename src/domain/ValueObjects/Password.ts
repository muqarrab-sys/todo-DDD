import { InternalServerException } from '@/application/exceptions';
import BCrypt from '@/infrastructure/utils/BCrypt';
import { Allow, IsString, Length } from 'class-validator';

export default class Password {
  @IsString() @Length(8) private password: string;

  @Allow() private hasPlainTextPassword: boolean = false;
  @Allow() private isPasswordEncoded: boolean = false;
  @Allow() private encodedPassword: string;

  constructor(password: string, isEncoded: boolean = false) {
    if (isEncoded) {
      this.saveEncoded(password);
    } else {
      this.savePlainText(password);
    }
  }

  get value(): string {
    return this.password || this.encoded;
  }

  get encoded(): string {
    if (!this.isPasswordEncoded) {
      throw new InternalServerException('Password is not encoded');
    }

    return this.encodedPassword;
  }

  get isEncoded() {
    return this.isPasswordEncoded;
  }

  get hasPlaintext() {
    return this.hasPlainTextPassword;
  }

  async encode(): Promise<string> {
    if (this.isPasswordEncoded) {
      throw new InternalServerException('Password is already encoded');
    }

    const encryption = new BCrypt();
    const encoded = await encryption.encrypt(this.password);

    this.saveEncoded(encoded);

    return this.encodedPassword;
  }

  async compare(hash: string): Promise<boolean> {
    if (!this.hasPlainTextPassword) {
      throw new InternalServerException('There is nothing to compare with');
    }

    const encryption = new BCrypt();

    return await encryption.compare(this.password, hash);
  }

  private saveEncoded(encoded: string) {
    this.encodedPassword = encoded;
    this.isPasswordEncoded = true;
  }

  private savePlainText(password: string) {
    this.password = password;
    this.hasPlainTextPassword = true;
  }
}
