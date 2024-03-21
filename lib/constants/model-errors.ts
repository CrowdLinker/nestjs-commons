/**
 * Model errors type declaration.
 *
 * @interface
 */
export interface ModelErrorsInterface {
  EXPIRED?: string;
  INVALID?: string;
  DISABLED?: string;
  NOT_FOUND: string;
  DUPLICATE_FOUND?: string;
  [key: string]: string;
}

/**
 * Constants defining model errors.
 *
 * @constant
 */
export const ModelErrors: ModelErrorsInterface = {
  EXPIRED: 'Record has expired.',
  INVALID: 'Record is invalid.',
  DISABLED: 'Record is not accessible.',
  NOT_FOUND: 'Record not found.',
  DUPLICATE_FOUND: 'Duplicate record found.',
};
