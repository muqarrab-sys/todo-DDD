import BaseHttpException from './base/BaseHttpException';
import { HttpStatusCode } from './types';

class InternalServerException extends BaseHttpException {
  constructor(description: string) {
    super('Internal Server Error', HttpStatusCode.NOT_FOUND, description, true);
  }
}

export default InternalServerException;
