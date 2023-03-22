import { assert } from 'chai';
import BCrypt from '../../../../src/Infrastructure/Auth/Encrypt/BCrypt';

describe('Bcrypt', () => {
  let password = '1234567890';

  it('encrypts a password', async () => {
    const encryptedPassword = await BCrypt.encrypt(password);

    assert.isString(encryptedPassword);
  });

  it('verifies the password', async () => {
    const encryptedPassword = await BCrypt.encrypt(password);

    const isMatch = await BCrypt.compare(password, encryptedPassword);

    assert.isTrue(isMatch);
  });
});
