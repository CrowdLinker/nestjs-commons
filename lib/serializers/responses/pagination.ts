import { PaginatedMetaData } from '../../interfaces/pagination';

/**
 * Success response type declaration.
 *
 * @interface
 */
interface PaginationResponse {
  statusCode: number;
  success: boolean;
  data: any[];
  meta: PaginatedMetaData;
}

/**
 * Success response entity used for serializing pagination response data.
 *
 * @class
 *
 * @implements {PaginationResponse}
 */
export class PaginationResponseEntity implements PaginationResponse {
  statusCode = 200;
  success = true;
  data: any = [];
  meta: PaginatedMetaData;

  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Partial<PaginationResponseEntity>} partial
   */
  constructor(partial: Partial<PaginationResponseEntity>) {
    Object.assign(this, partial);
  }
}
