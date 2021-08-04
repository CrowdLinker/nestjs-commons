import { Request } from 'express';
import { InputInterface } from '../../interfaces/inputs';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator used for returning data for a edit request.
 * The data argument here is used for adding fields from
 * the params of incoming request. By default "id" params
 * are pushed to the request body object to be returned.
 *
 * @constant
 *
 * @returns {InputInterface} Returns transformed request body data.
 */
export const EditRequest = createParamDecorator(
  (data: string[] = ['id'], ctx: ExecutionContext): InputInterface => {
    const req: Request = ctx.switchToHttp().getRequest();

    const requestParamsToReturn = {};

    data.forEach((dataString) =>
      Object.assign(requestParamsToReturn, {
        [dataString]: req.params[dataString],
      }),
    );

    return { ...req.body, ...requestParamsToReturn };
  },
);
