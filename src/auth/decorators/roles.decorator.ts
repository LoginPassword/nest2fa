import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/database/entities/user';

export const Roles = (...roles: UserRole[]) => SetMetadata('role', roles);
