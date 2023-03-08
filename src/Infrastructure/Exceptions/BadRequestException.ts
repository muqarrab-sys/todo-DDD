import BaseHttpException from './Base/BaseHttpException';
import { HttpStatusCode } from '@interfaces/HttpInterfaces';

class BadRequestException extends BaseHttpException {
  constructor(description: string) {
    super('Bad Request', HttpStatusCode.BAD_REQUEST, description, true);
  }
}

export default BadRequestException;
