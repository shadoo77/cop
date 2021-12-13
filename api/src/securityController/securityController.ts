import { Response, NextFunction } from 'express';
import { Logger } from '../logger';
import ENV from '../utils/config';

export default () => {
  // async function authenticateToken(
  //   req: IAuthenticateTokenRequest,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   try {
  //     Logger.enter('Authenticate user');
  //     const authHeader = req.headers.authorization;
  //     const token = authHeader && authHeader.split(' ')[1];
  //     const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
  //     req.user = decoded;
  //     return next();
  //   } catch (error) {
  //     return res.status(401).json({ error: 'Not authorized to access this resource!' });
  //   }
  // }

  return {
    // authenticateToken,
  };
};
