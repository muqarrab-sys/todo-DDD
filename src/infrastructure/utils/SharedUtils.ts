import { v4 as uuidv4 } from 'uuid';

class SharedUtils {
  static uuid(): string {
    return uuidv4();
  }
}

export default SharedUtils;
