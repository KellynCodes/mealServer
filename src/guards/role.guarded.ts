import { ExtractJwt } from 'passport-jwt';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../data/enums/user/userRoles';

@Injectable()
export class RolesGuarded implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const token = ExtractJwt.fromAuthHeaderAsBearerToken();
    const { roles } = token;
    return requiredRoles.some((role) => roles == role);
  }
}
