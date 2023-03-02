import BaseHttpException from './Base/BaseHttpException';
import { HttpStatusCode } from '@interfaces/HttpStatus';

class ConflictException extends BaseHttpException {
  constructor(description: string) {
    super('Conflict', HttpStatusCode.CONFLICT, description, true);
  }
}

export default ConflictException;
