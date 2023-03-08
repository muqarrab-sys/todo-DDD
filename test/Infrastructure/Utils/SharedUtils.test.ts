import { assert } from 'chai';
import SharedUtils from '../../../src/Infrastructure/Utils/SharedUtils';

describe('Shared Utils', () => {
  describe('uuid', () => {
    it('returns uuid in v4 format', () => {
      const uuid = SharedUtils.uuid();

      const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
      const isValid = regexExp.test(uuid);

      assert.isString(uuid, 'Is not a string');
      assert.isTrue(isValid, 'Is not valid uuid-v4');
    });
  });

  describe('converts to boolean', () => {
    it("converts 'true/false' (string) to boolean", () => {
      const isTrue = SharedUtils.convertToBoolean('true');
      const isFalse = SharedUtils.convertToBoolean('false');

      assert.isTrue(isTrue);
      assert.isFalse(isFalse);
    });

    it("converts non 'true/false' values into false", () => {
      const isFalse = SharedUtils.convertToBoolean('asd' as unknown as 'true');

      assert.isFalse(isFalse);
    });
  });
});
