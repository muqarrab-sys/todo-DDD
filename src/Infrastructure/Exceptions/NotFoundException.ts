import BaseHttpException from './Base/BaseHttpException';
import { HttpStatusCode } from '@interfaces/HttpStatus';

class NotFoundException extends BaseHttpException {
  constructor(description: string) {
    super('Not Found', HttpStatusCode.NOT_FOUND, description, true);
  }
}

export default NotFoundException;