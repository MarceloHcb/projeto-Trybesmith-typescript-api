import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET :string = process.env.JWT_SECRET || 'secret';
const JWT_CONFIG: SignOptions = { 
  algorithm: 'HS256',
  expiresIn: '1h',
};

const verifyToken = (token:string):JwtPayload | string => jwt.verify(token, JWT_SECRET);
const createToken = (id:number, username:string):string => jwt
  . sign({ data: username }, JWT_SECRET, JWT_CONFIG);

export default {
  createToken,
  verifyToken,
};