import { Request } from 'express';
import { InputInterface } from '../../interfaces/inputs';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator used for returning data for a create request.
 * The data argument here is used for stripping of fields
 * from the incoming request. There can be instance when
 * not all body data might be required as inputs.
 *
 * @constant
 *
 * @returns {InputInterface} Returns transformed request body data.
 */
export const CreateRequest = createParamDecorator(
  (data: string[] = ['id'], ctx: ExecutionContext): InputInterface => {
    const req: Request = ctx.switchToHttp().getRequest();

    const { body } = req;

    data.forEach((dataString) => {
      if (body.hasOwnProperty(dataString)) {
        delete body[dataString];
      }
    });

    return body;
  },
);
