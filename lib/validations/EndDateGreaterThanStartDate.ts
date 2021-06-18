import {
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Dayjs } from 'dayjs';
import { Injectable } from '@nestjs/common';
import { toDateDayjs } from '../helpers/date';

/**
 * Validation contraint dealing with end date based validations.
 *
 * Check if input end date is greater than start date in the database.
 *
 * @class
 *
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ name: 'endDateGreaterThanStartDate', async: true })
@Injectable()
export class EndDateGreaterThanStartDate
  implements ValidatorConstraintInterface
{
  /**
   * Validate input.
   *
   * @param {string} id
   * @param {ValidationArguments} args
   *
   * @returns {Promise<boolean>} Retuns true if succeeds and false if fails.
   */
  validate(endDate: string | Date | Dayjs, args: ValidationArguments): boolean {
    if (!endDate) {
      return true;
    }

    const { startDate } = args.object as { startDate: string | Date | Dayjs };

    const newStartDate = toDateDayjs(startDate);
    const newEndDate = toDateDayjs(endDate);

    return newStartDate && newEndDate && newEndDate.isAfter(newStartDate);
  }

  /**
   * Default error message if the input being validated fails.
   *
   * @param {ValidationArguments} args
   *
   * @returns {string} Retuns string
   */
  defaultMessage(args: ValidationArguments): string {
    return 'End date field must be greater than start date.';
  }
}
