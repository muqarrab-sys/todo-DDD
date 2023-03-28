import BaseHttpException from './Base/BaseHttpException';
import { HttpStatusCode } from '@interfaces/HttpInterfaces';

class NotFoundException extends BaseHttpException {
  constructor(description: string = 'Item not found!') {
    super('Not Found', HttpStatusCode.NOT_FOUND, description, true);
  }
}

export default NotFoundException;
