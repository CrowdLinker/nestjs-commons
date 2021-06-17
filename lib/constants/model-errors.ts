/**
 * Model errors type declaration.
 *
 * @interface
 */
export interface ModelErrorsInterface {
  INVALID?: string;
  DISABLED?: string;
  NOT_FOUND: string;
  DUPLICATE_FOUND?: string;
}

/**
 * Constants defining model errors.
 *
 * @constant
 */
export const ModelErrors: ModelErrorsInterface = {
  INVALID: 'Record is invalid.',
  DISABLED: 'Record is not accessible.',
  NOT_FOUND: 'Record not found.',
  DUPLICATE_FOUND: 'Duplicate record found.',
};
