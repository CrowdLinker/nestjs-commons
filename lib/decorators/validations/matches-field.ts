import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Custom validation decorator used to check if one field value
 * matches the other in the same DTO.
 *
 * @returns {function} Returns validator function
 */
export function MatchesField(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchesFieldConstraint,
    });
  };
}

/**.
 * Checks if values of two different inputs fields match.
 *
 * @class
 *
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ name: 'MatchesField' })
export class MatchesFieldConstraint implements ValidatorConstraintInterface {
  /**
   * Validate input.
   *
   * @param {any} value
   * @param {ValidationArguments} args
   *
   * @returns {boolean} Returns true if succeeds and false if fails.
   */
  validate(value: any, args: ValidationArguments): boolean {
    // Get the property name that we need value to be equal to
    const [relatedPropertyName] = args.constraints;

    // Get the value that required to be equal to provided value
    const relatedValue = (args.object as any)[relatedPropertyName];

    // Check if values are equal
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    return `${relatedPropertyName} and ${args.property} don't match.`;
  }
}
