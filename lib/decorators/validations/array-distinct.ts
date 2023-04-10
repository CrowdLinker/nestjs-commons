import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

/**
 * Custom validation decorator used to check if array contains distinct values.
 * 
 * @param {string} property 
 * @param {ValidationOptions?} validationOptions 

 */
export default function ArrayDistinct(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      name: 'ArrayDistinct',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          if (Array.isArray(value)) {
            const distinct = [
              ...new Set(
                value.map((v): Record<string, unknown> => v[property]),
              ),
            ];
            return distinct.length === value.length;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} contains duplicate ${args.constraints[0]} values.`;
        },
      },
    });
  };
}
