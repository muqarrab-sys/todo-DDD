import jwt from 'jsonwebtoken';
import configs from './configs';

interface IJwtPayload {
  id: string;
}

class Auth {
  constructor() {}

  genToken(payload: IJwtPayload): string {
    return jwt.sign(payload, configs.jwt.secret);
  }

  decodeToken(token: string): IJwtPayload {
    return jwt.verify(token, configs.jwt.secret) as IJwtPayload;
  }
}

export default Auth;
