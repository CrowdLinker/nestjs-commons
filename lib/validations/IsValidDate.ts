import dayjs from 'dayjs';
import isString from 'lodash/isString';
import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Validation decorator dealing with string based date type validations.
 * Checks if the string is a valid date.
 *
 * Refer: https://github.com/typestack/class-validator#custom-validation-decorators
 *
 * @function
 */
export const IsValidDate = (validationOptions?: ValidationOptions) => {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      name: 'isValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!isString(value)) {
            return false;
          }

          const now = dayjs();
          const enteredDate = dayjs(value);

          return (
            enteredDate.isValid() &&
            (enteredDate.isBefore(now) || enteredDate.isSame(now))
          );
        },
      },
    });
  };
};
