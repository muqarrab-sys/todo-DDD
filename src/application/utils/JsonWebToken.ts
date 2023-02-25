import jwt from 'jsonwebtoken';

class JsonWebToken {
  static encode(data: Object) {
    return jwt.sign(data, process.env.SECRET);
  }

  static decode(token: string) {
    return jwt.verify(token, process.env.SECRET);
  }
}

export default JsonWebToken;
