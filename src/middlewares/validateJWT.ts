import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import tokenUtils from '../auth/authFunctions';

interface CustomRequest extends Request {
  payload?: JwtPayload | string;
}

const validateJWT = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const payload: JwtPayload | string = tokenUtils.verifyToken(token);
    req.payload = payload;
    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log(error);
    return res.status(500).json({ message: 'Internal error' });
  }
};

export default validateJWT;
