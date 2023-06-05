import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

/**
 * Custom validation decorator used to check one input field is lesser than the other field
 * in the same DTO.
 *
 * @returns {function} Returns validator function
 */
export function IsLesserThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      constraints: [property],
      propertyName,
      options: validationOptions,
      validator: IsLesserThanConstraint,
    });
  };
}

/**.
 * Checks if value of one input field is lesser than the other.
 *
 * @class
 *
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ name: 'IsLesserThan' })
export class IsLesserThanConstraint implements ValidatorConstraintInterface {
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
      typeof value === 'number' &&
      typeof relatedValue === 'number' &&
      value < relatedValue
    );
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    return `${args.property} must be lesser than ${relatedPropertyName}`;
  }
}
