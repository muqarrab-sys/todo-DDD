import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { validate } from 'class-validator';
import { GenderEnum } from '../../../interfaces/user';
import { GoogleCodeDto, UserCreationDto, UserCredentialsDto, UserUpdateDto, UserUpdatePasswordDto } from '../../../src/Application/Dto/UserDto';

describe('User Validation', () => {
  describe('User Creation', () => {
    it('must have name', async () => {
      const user = new UserCreationDto();
      user.email = faker.internet.email();
      user.password = '1234567890';

      const errors = await validate(user);

      expect(errors.length).eq(1);
    });

    it('must have email', async () => {
      const user = new UserCreationDto();
      user.name = faker.name.fullName();
      user.password = '1234567890';

      const errors = await validate(user);

      expect(errors.length).eq(1);
    });

    it('must have password', async () => {
      const user = new UserCreationDto();
      user.name = faker.name.fullName();
      user.email = faker.internet.email();

      const errors = await validate(user);

      expect(errors.length).eq(1);
    });

    it('validates user creation object', async () => {
      const user = new UserCreationDto();
      user.name = faker.name.fullName();
      user.email = faker.internet.email();
      user.gender = GenderEnum.MALE;
      user.dob = faker.date.birthdate();
      user.password = '1234567890';

      const errors = await validate(user);

      expect(errors.length).eq(0);
    });
  });

  describe('User Credentials', () => {
    it('must have email and password', async () => {
      const user = new UserCredentialsDto();
      const error1 = await validate(user);

      user.email = faker.internet.email();
      const error2 = await validate(user);

      user.password = '1234567890';
      const error3 = await validate(user);

      expect(error1.length).eq(2);
      expect(error2.length).eq(1);
      expect(error3.length).eq(0);
    });
  });

  describe('Google Code', () => {
    it('must have code', async () => {
      const googleCode = new GoogleCodeDto();

      googleCode.code = faker.lorem.text();
      const error = await validate(googleCode);

      expect(error.length).eq(0);
    });
  });

  describe('User Update', () => {
    it('must have at least one value', async () => {
      const user = new UserUpdateDto();
      user.name = faker.name.fullName();

      const errors = await validate(user);

      expect(errors.length).eq(0);
    });
  });

  describe('User Update Password', () => {
    it('must have all password fields', async () => {
      const passwords = new UserUpdatePasswordDto();
      passwords.oldPassword = '1234567890';
      passwords.newPassword = '1234567890';
      passwords.confirmPassword = '1234567890';

      const errors = await validate(passwords);

      expect(errors.length).eq(0);
    });
  });
});
