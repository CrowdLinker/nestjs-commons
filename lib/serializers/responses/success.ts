import { HttpStatus } from '@nestjs/common';

/**
 * Success response type declaration.
 *
 * @interface
 */
interface SuccessResponse {
  statusCode: number;
  success: boolean;
  data: any;
}

/**
 * Success response entity used for serializing response data.
 *
 * @class
 *
 * @implements {SuccessResponse}
 */
export class SuccessResponseEntity implements SuccessResponse {
  statusCode = HttpStatus.OK;
  success = true;
  data: any = {};

  constructor(partial: Partial<SuccessResponseEntity>) {
    Object.assign(this, partial);
  }
}
