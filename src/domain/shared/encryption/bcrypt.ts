import bcrypt from 'bcrypt';

export default class BCrypt {
  private salt: string;
  private saltRounds: number = 10;

  async genSalt(rounds: number) {
    this.salt = await bcrypt.genSalt(rounds);
  }

  async encrypt(str: string) {
    return await bcrypt.hash(str, this.salt || this.saltRounds);
  }

  async compare(a: string, b: string) {
    return await bcrypt.compare(a, b);
  }
}
