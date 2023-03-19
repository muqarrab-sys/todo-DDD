import bcrypt from 'bcrypt';

export default class BCrypt {
  static async encrypt(str: string, saltRounds: number = 10) {
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(str, salt);
  }

  static async compare(plainText: string, hash: string) {
    try {
      return await bcrypt.compare(plainText, hash);
    } catch (error) {
      return false;
    }
  }
}
