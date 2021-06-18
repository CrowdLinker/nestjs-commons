import isArray from 'lodash/isArray';
import { ValidationError } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export const DEFAULT_VALIDATION_ERROR_VARIABLES_TO_ASSIGN = [
  'property',
  'children',
  'constraints',
];

/**
 * Message entity used for serializing validation error data.
 *
 * @class
 *
 * @implements {ValidationError}
 */
export class ValidationErrorEntity extends ValidationError {
  property: string;

  @Transform((params) => (isArray(params.value) ? params.value : []))
  @Type(() => ValidationError)
  children: ValidationError[];

  constraints: {
    [type: string]: string;
  };

  /**
   * Create an instance of class and initialize all class variables.
   *
   * @constructs
   *
   * @param {Partial<ValidationErrorEntity>} partial
   */
  constructor(
    partial: Partial<ValidationErrorEntity>,
    variablesToAssign: string[] = DEFAULT_VALIDATION_ERROR_VARIABLES_TO_ASSIGN,
  ) {
    super();

    if (!partial) {
      return;
    }

    variablesToAssign.forEach((variable) => {
      if (!partial[variable] && variable !== 'children') {
        partial[variable] = null;
      }

      if (!partial[variable] && variable === 'children') {
        partial[variable] = [];
      }

      Object.assign(this, { [variable]: partial[variable] });
    });
  }
}
