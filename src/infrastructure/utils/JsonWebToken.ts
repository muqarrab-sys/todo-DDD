import jwt from 'jsonwebtoken';

export interface IJwtPayload {
  id: number;
  uid: string;
}

class JsonWebToken {
  static encode(data: IJwtPayload) {
    const token = jwt.sign(data, process.env.SECRET);

    return `bearer ${token}`;
  }

  static decode(token: string): IJwtPayload {
    const fixedToken = token.replace('bearer ', '');

    return jwt.verify(fixedToken, process.env.SECRET) as IJwtPayload;
  }
}

export default JsonWebToken;
