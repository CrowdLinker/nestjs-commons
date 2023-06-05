import { Request } from 'express';

/**
 * Type declaration - Express request containing user.
 *
 * @interface
 */
export interface RequestWithUser extends Request {
  user: any;
}

/**
 * Type declaration - Express request containing raw body.
 *
 * @interface
 */
export interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}
