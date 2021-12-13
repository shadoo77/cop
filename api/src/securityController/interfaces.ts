import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IAuthenticateTokenRequest extends Request {
  user: JwtPayload | string;
}
