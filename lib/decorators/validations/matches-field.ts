import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Decorator used for validation of incoming DTO.
 * Check if the value of the filed that is under check is equal to the value of the property provided(in the same DTO)
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
 * Checks fields are equal.
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
    return `${relatedPropertyName} and ${args.property} don't match`;
  }
}
