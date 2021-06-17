import {
  HttpStatus,
  ArgumentMetadata,
  ValidationPipeOptions,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ValidationErrorEntity } from '../serializers/exceptions/validation.serializer';

/**
 * Default Validation Pipe Options
 *
 * @constant
 */
export const validationPipeOptions: ValidationPipeOptions = {
  validateCustomDecorators: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  validationError: {
    target: false,
    value: false,
  },
  exceptionFactory: (errors: ValidationError[]) => {
    return new HttpErrorByCode[HttpStatus.UNPROCESSABLE_ENTITY](
      errors.map((error) => new ValidationErrorEntity(error)),
    );
  },
};

/**
 * Pipe used for validating incoming request data.
 *
 * @class
 *
 * @extends {NestValidationPipe}
 */
export class ValidationPipe extends NestValidationPipe {
  /**
   * Transform request data and return transformed
   * object with keys required for searching entities.
   *
   * @param {any} value
   * @param {metadata} ArgumentMetadata
   *
   * @returns {Promise<any>} Returns value (request data) if succeeds.
   */
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;

    if ([].includes(metatype)) {
      return value;
    }

    return super.transform(value, metadata);
  }
}
