import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtUser = {
  id: number;
  email: string;
  phone: string;
  role: string;
  status: string;
};

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): JwtUser => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
