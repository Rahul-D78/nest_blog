import { HttpCode, HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { decode } from '../utils/jwt.utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.header('authorization')?.split(' ');
    if(!authHeader) throw new HttpException({message: "authorization failed"}, HttpStatus.UNAUTHORIZED)

    if(authHeader[0] != "Token") throw new HttpException({message: "authorization failed, Token missing"}, HttpStatus.UNAUTHORIZED)
   
      const token = authHeader[1];
      const user = await decode(token);
      if(!user) throw new HttpException({message: "No user Found"}, HttpStatus.UNAUTHORIZED);
      (req as any).user = user
      next();
  }
}
