import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { InputInterface } from '../../interfaces/inputs';
import { Request } from 'express';
import get from 'lodash/get';

/**
 * Decorator used for adding logged in user's id to the request body.
 *
 * @constant
 *
 * @returns {InputInterface} Returns transformed request body data.
 */
export const RequestWithUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): InputInterface => {
    const req: Request = ctx.switchToHttp().getRequest();

    const userId = get(req, 'user.id', null);

    return userId ? { ...req.body, userId } : req.body;
  },
);
