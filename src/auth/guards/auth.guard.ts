import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JwtService:JwtService){}
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if(!token){
      throw new UnauthorizedException();
    }
    try {
      const decoded = await this.JwtService.verify(token);
      request.user=decoded;
    } catch (error) {
      console.log(error);
    }
    return true;
  }
}
