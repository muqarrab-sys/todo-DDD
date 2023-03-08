import { assert } from 'chai';
import { JwtPayload } from '../../../interfaces/index';
import JsonWebToken from '../../../src/Infrastructure/Auth/JsonWebToken';

describe('Json Web Token', () => {
  let payload: JwtPayload = { sub: '1234567890' };

  it('generates a jwt token with payload', () => {
    const token = JsonWebToken.encode(payload);
    const parts = token.replace('bearer ', '').split('.');
    const header = JSON.parse(atob(parts[0]));

    assert.isTrue(token.startsWith('bearer '));
    assert.equal(parts.length, 3);
    assert.equal(header.typ, 'JWT');
  });

  it('decodes the jwt token and returns payload', () => {
    const token = JsonWebToken.encode(payload);
    const response = JsonWebToken.decode(token);

    assert.equal(response.sub, payload.sub);
  });
});
