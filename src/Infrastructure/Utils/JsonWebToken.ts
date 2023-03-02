import { JwtPayload } from '@interfaces/index';
import jwt from 'jsonwebtoken';

class JsonWebToken {
  static encode(data: JwtPayload) {
    const token = jwt.sign(data, process.env.SECRET);

    return `bearer ${token}`;
  }

  static decode(token: string): JwtPayload {
    const fixedToken = token.replace('bearer ', '');

    return jwt.verify(fixedToken, process.env.SECRET) as JwtPayload;
  }
}

export default JsonWebToken;
