import BaseHttpException from './base/BaseHttpException';
import { HttpStatusCode } from './types';

class UnAuthorizedException extends BaseHttpException {
  constructor(description: string) {
    super('UnAuthorized', HttpStatusCode.UnAuthorized, description, true);
  }
}

export default UnAuthorizedException;
