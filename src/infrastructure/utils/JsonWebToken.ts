import jwt from 'jsonwebtoken';

export interface IJwtPayload {
  id: number;
  uid: string;
}

class JsonWebToken {
  static encode(data: IJwtPayload) {
    return jwt.sign(data, process.env.SECRET);
  }

  static decode(token: string): IJwtPayload {
    return jwt.verify(token, process.env.SECRET) as IJwtPayload;
  }
}

export default JsonWebToken;
