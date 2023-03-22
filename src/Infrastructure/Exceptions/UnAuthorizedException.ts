import BaseHttpException from './Base/BaseHttpException';
import { HttpStatusCode } from '@interfaces/HttpInterfaces';

class UnAuthorizedException extends BaseHttpException {
  constructor(description: string) {
    super('UnAuthorized', HttpStatusCode.UnAuthorized, description, true);
  }
}

export default UnAuthorizedException;
