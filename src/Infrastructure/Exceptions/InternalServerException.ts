import BaseHttpException from './Base/BaseHttpException';
import { HttpStatusCode } from '@interfaces/HttpStatus';

class InternalServerException extends BaseHttpException {
  constructor(description: string) {
    super('Internal Server Error', HttpStatusCode.NOT_FOUND, description, true);
  }
}

export default InternalServerException;
