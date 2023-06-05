import get from 'lodash/get';
import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InputInterface } from '../../interfaces/inputs';

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

    const user = get(req, 'user', null);

    if (user) {
      return { ...req.body, userId: get(user, 'id') };
    }

    return req.body;
  },
);
