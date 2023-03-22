import { Env } from '@interfaces/index';
import { v4 as uuidv4 } from 'uuid';

class SharedUtils {
  static uuid(): string {
    return uuidv4();
  }

  static convertToBoolean(value: 'true' | 'false') {
    return { true: true, false: false }[value] || false;
  }

  static isDevelopment = () => process.env.NODE_ENV === Env.DEV;

  static isProduction = () => process.env.NODE_ENV === Env.PROD;

  static isTest = () => process.env.NODE_ENV === Env.TEST;
}

export default SharedUtils;
