import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import isNumber from 'lodash/isNumber';

/**
 * Custom validation decorator used to check one input field is bigger than the other field
 * in the same DTO.
 *
 * @returns {function} Returns validator function
 */
export function IsBiggerThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      constraints: [property],
      propertyName,
      options: validationOptions,
      validator: IsBiggerThanConstraint
    });
  };
}


/**.
 * Checks if value of one input field is bigger than the other.
 *
 * @class
 *
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ name: 'IsBiggerThan' })
export class IsBiggerThanConstraint implements ValidatorConstraintInterface {
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
  
    return (
      isNumber(value) &&
      isNumber(relatedValue) &&
      value > relatedValue
    );
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    return `${args.property} must be bigger than ${relatedPropertyName}`;
  }
}
