import { HttpStatusCode, IHttpResponse } from '@interfaces/HttpInterfaces';

class BaseController {
  constructor() {}

  protected ok(data: Object, message: string = 'Success'): IHttpResponse {
    return { status: HttpStatusCode.OK, message, success: true, data };
  }

  protected created(data: Object, message: string = 'Created!'): IHttpResponse {
    return { status: HttpStatusCode.CREATED, message, success: true, data };
  }

  protected noContent(data: Object, message: string = 'No Content'): IHttpResponse {
    return { status: HttpStatusCode.NO_CONTENT, message, success: true, data };
  }

  protected NotFound(data: Object, errors: Array<any>, message: string = 'Not Found!'): IHttpResponse {
    return { status: HttpStatusCode.NOT_FOUND, message, success: false, data, errors };
  }
}

export default BaseController;
