import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../customDecorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY
            ,[
            context.getHandler(),
            context.getClass()
        ])
        if(!requiredRoles){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.some((role) =>user.roles===role);
      }
}