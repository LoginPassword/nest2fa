import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/database/entities/User';

export const Roles = (...roles: UserRole[]) => SetMetadata('role', roles);
