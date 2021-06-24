import {
  Optional,
  HttpStatus,
  ArgumentMetadata,
  ValidationPipeOptions,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ModelEntity } from '../serializers/model';
import { ValidationErrorEntity } from '../serializers/exceptions/validation';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

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
   * Custom entity types that don't need to be validated.
   *
   * @var {ModelEntity[]}
   */
  protected entityTypes: ModelEntity[] = [];

  /**
   * Creates an instance of the class.
   *
   * @param {ValidationPipeOptions} options
   * @param {ModelEntity[]} entityTypes
   */
  constructor(
    @Optional() options?: ValidationPipeOptions,
    entityTypes: ModelEntity[] = [],
  ) {
    super();

    this.entityTypes = entityTypes;
  }

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

    if (this.entityTypes.includes(metatype)) {
      return value;
    }

    return super.transform(value, metadata);
  }
}
