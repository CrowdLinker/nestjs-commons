import get from 'lodash/get';
import { ModelEntity } from '../../serializers/model.serializer';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Decorator used for returning entity data from a request.
 *
 * @constant
 *
 * @returns {ModelEntity} Returns transformed entity data.
 */
export const EntityBeingQueried = createParamDecorator(
  (data: string, ctx: ExecutionContext): ModelEntity => {
    const req = ctx.switchToHttp().getRequest();

    if (data) {
      return get(req, `${data}BeingQueried`);
    }

    return get(req, 'entityBeingQueried');
  },
);
