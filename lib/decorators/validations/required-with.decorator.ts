import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import isNil from 'lodash/isNil';

export function RequiredWith(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: RequiredWithConstraint,
    });
  };
}

/**
 * Checks if one input field is required when the other field is present
 * in the same DTO.
 * 
 * @returns {function} Returns validator function
 */
@ValidatorConstraint({ name: 'RequiredWith' })
export class RequiredWithConstraint implements ValidatorConstraintInterface {
  /**
   * Validate input.
   *
   * @param value
   * @param args
   * @returns
   */
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    const relatedValue = (args.object as any)[relatedPropertyName];

    return !isNil(relatedValue);
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    return `${args.property} is required when ${relatedPropertyName} is present`;
  }
}
