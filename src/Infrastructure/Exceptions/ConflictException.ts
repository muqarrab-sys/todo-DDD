import BaseHttpException from './Base/BaseHttpException';
import { HttpStatusCode } from '@interfaces/HttpInterfaces';

class ConflictException extends BaseHttpException {
  constructor(description: string) {
    super('Conflict', HttpStatusCode.CONFLICT, description, true);
  }
}

export default ConflictException;
