import { InputInterface } from '../../interfaces/inputs.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator used for returning data for a create/edit request.
 *
 * The data argument here is used for adding fields from
 * the params of incoming request. By default "id" params
 * are pushed to the request body object to be returned.
 *
 * @constant
 *
 * @returns {InputInterface} Returns transformed request body data.
 */
export const ParamizedRequestBody = createParamDecorator(
  (data: string[] = ['id'], ctx: ExecutionContext): InputInterface => {
    const req = ctx.switchToHttp().getRequest();

    const requestParamsToReturn = {};

    data.forEach((dataString) =>
      Object.assign(requestParamsToReturn, {
        [dataString]: req.params[dataString],
      }),
    );

    const bodyData = req.body;
    if (Array.isArray(bodyData)) {
      return bodyData.map((data) => ({ ...data, ...requestParamsToReturn }));
    }

    return { ...req.body, ...requestParamsToReturn };
  },
);
