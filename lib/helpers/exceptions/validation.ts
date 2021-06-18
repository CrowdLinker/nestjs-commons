import {
  ValidationErrorEntity,
  DEFAULT_VALIDATION_ERROR_VARIABLES_TO_ASSIGN,
} from '../../serializers/exceptions/validation';
import { ValidationError } from 'class-validator';
import { UnprocessableEntityException } from '@nestjs/common';

/**
 * Create success response and return a transformed response object.
 *
 * @function
 *
 * @param {ValidationError|ValidationError[]} data
 * @param {string[]} variablesToAssign optional - Customize the validation error properties returned in response
 *
 * @throws {SuccessResponseEntity}
 */
export const validationException = (
  errors: ValidationError | ValidationError[],
  variablesToAssign: string[] = DEFAULT_VALIDATION_ERROR_VARIABLES_TO_ASSIGN,
): void => {
  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  throw new UnprocessableEntityException(
    errors.map((error) => new ValidationErrorEntity(error, variablesToAssign)),
  );
};
