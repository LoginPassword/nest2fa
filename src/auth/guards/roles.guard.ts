import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, UserStatus } from 'src/database/entities/User';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) throw new UnauthorizedException();
    if (user.status === UserStatus.BAN) throw new UnauthorizedException('User is banned');
    if (user.role === UserRole.ADMIN) return true;
    if (requiredRoles.includes(UserRole.MODERATOR) && user.role === UserRole.MODERATOR) return true;
    if (requiredRoles.includes(UserRole.USER)) return true;

    throw new UnauthorizedException();
  }
}
