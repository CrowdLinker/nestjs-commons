import { PaginatedMetaData } from '../../interfaces/pagination';

/**
 * Success response type declaration.
 *
 * @interface
 */
interface PaginationResponse<T> {
  statusCode: number;
  success: boolean;
  data: T[];
  meta: PaginatedMetaData;
}

/**
 * Success response entity used for serializing pagination response data.
 *
 * @class
 *
 * @implements {PaginationResponse<T>}
 */
export class PaginationResponseEntity<T> implements PaginationResponse<T> {
  statusCode = 200;
  success = true;
  data: T[] = [];
  meta: PaginatedMetaData;

  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Partial<PaginationResponseEntity<T>>} partial
   */
  constructor(partial: Partial<PaginationResponseEntity<T>>) {
    Object.assign(this, partial);
  }
}
