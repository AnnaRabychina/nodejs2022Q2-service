import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.headers.authorization.split(' ')[1];

      const verify = this.jwtService.verify(token);

      if (Date.now() >= verify.exp * 1000) {
        return false;
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
