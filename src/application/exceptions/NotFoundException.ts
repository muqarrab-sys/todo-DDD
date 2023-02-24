import BaseHttpException from './base/BaseHttpException';
import { HttpStatusCode } from './types';

class NotFoundException extends BaseHttpException {
  constructor(description: string) {
    super('Not Found', HttpStatusCode.NOT_FOUND, description, true);
  }
}

export default NotFoundException;
