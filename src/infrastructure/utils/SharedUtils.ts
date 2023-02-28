import { v4 as uuidv4 } from 'uuid';

class SharedUtils {
  static uuid(): string {
    return uuidv4();
  }

  static convertToBoolean(value: 'true' | 'false') {
    return { true: true, false: false }[value] || false;
  }
}

export default SharedUtils;
