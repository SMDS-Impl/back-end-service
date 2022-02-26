import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { EUserRole } from 'src/enums/EUserRole';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req, _: Response, next: Function) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) throw new UnauthorizedException('Unauthorized access');
      const payload = this.jwtService.verify(token);
      if (!payload) throw new UnauthorizedException('Token expired');
      req.user = payload;
      if(payload.role != EUserRole.ADMIN) throw new UnauthorizedException('Unauthorized access');
    } catch (error) {
      throw new UnauthorizedException("A valid bearer auth-token required");
    }
    next();
  }
}
