import BaseHttpException from './Base/BaseHttpException';
import { HttpStatusCode } from '@interfaces/HttpStatus';

class UnAuthorizedException extends BaseHttpException {
  constructor(description: string) {
    super('UnAuthorized', HttpStatusCode.UnAuthorized, description, true);
  }
}

export default UnAuthorizedException;
