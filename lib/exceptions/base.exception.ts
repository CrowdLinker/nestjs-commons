/**
 * Base Exception class.
 *
 * @throws {BaseException}
 */
export class BaseException extends Error {
  /**
   * Exception prototype.
   */
  private __proto__!: BaseException;

  /**
   * Creates a class instance.
   *
   * @param {string} message
   */
  constructor(message?: string) {
    super(message);

    const actualProto = new.target.prototype;

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
  }
}
