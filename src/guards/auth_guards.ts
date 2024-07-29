import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private readonly AuthService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = await this.AuthService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;
      return true;
    } catch (e) {
      return false;
    }
  }
}
