import BaseHttpException from './base/BaseHttpException';
import { HttpStatusCode } from './types';

class BadRequestException extends BaseHttpException {
  constructor(description: string) {
    super('Bad Request', HttpStatusCode.BAD_REQUEST, description, true);
  }
}

export default BadRequestException;
