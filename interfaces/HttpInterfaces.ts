export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UnAuthorized = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER = 500,
}

export interface IHttpResponse {
  status: HttpStatusCode;
  success: boolean;
  data?: Object;
  errors?: Array<any>;
  message: string;
}
