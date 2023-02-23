import BaseHttpException from './base/BaseHttpException';
import { HttpStatusCode } from './types';

class ConflictException extends BaseHttpException {
  constructor(description: string) {
    super('Conflict', HttpStatusCode.CONFLICT, description, true);
  }
}

export default ConflictException;
