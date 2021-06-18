import {
  TIMEZONES,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DATE_TIME_ISO_FORMAT,
} from '../constants/date';
import isNull from 'lodash/isNull';
import dayjs, { Dayjs } from 'dayjs';
import { DateInterval } from '../interfaces/date';

/**
 * Convert a string or date object in a "YYYY-MM-DD" based
 * string.
 *
 * @function
 *
 * @param {string|Date|Dayjs} date
 *
 * @returns {string|null}
 */
export const toDateString = (date?: string | Date | Dayjs): string | null => {
  if (isNull(date)) {
    return null;
  }

  const newDate = date ? dayjs(date) : dayjs();

  return newDate.isValid() ? newDate.startOf('date').format(DATE_FORMAT) : null;
};

/**
 * Convert a string or date object in a "YYYY-MM-DD" based
 * string.
 *
 * @function
 *
 * @param {string|Date|Dayjs} date
 * @param {string} format
 *
 * @returns {string|null}
 */
export const toDateTimeString = (
  date?: string | Date | Dayjs,
  format = DATE_TIME_FORMAT,
): string | null => {
  if (isNull(date)) {
    return null;
  }

  const newDate = date ? dayjs(date) : dayjs();

  return newDate.isValid() ? newDate.format(format) : null;
};

/**
 * Convert a string or date object in a "YYYY-MM-DDTHH:mm:ssZ" based
 * string.
 *
 * @function
 *
 * @param {string|Date|Dayjs} date
 *
 * @returns {string|null}
 */
export const toDateTimeISOString = (
  date?: string | Date | Dayjs,
): string | null => {
  return toDateTimeString(date, DATE_TIME_ISO_FORMAT);
};

/**
 * Convert a string or date object in a Dayjs based object
 * by setting the time at "00:00:00" for that date.
 *
 * @function
 *
 * @param {string|Date|Dayjs} date
 *
 * @returns {Dayjs|null}
 */
export const toDateDayjs = (date?: string | Date | Dayjs): Dayjs | null => {
  if (isNull(date)) {
    return null;
  }

  const newDate = date ? dayjs(date) : dayjs();

  return newDate.isValid() ? newDate.startOf('date') : null;
};

/**
 * Get start & end time of the day.
 *
 * @function
 *
 * @returns {Dayjs[]}
 */
export const getDayTimes = (date: string | Date | Dayjs): Dayjs[] => {
  date = dayjs(date).clone();

  return [
    date.startOf('date'), // startDate
    date.endOf('date'), // endDate,
  ];
};

/**
 * Get start, end & mid dates of the current month.
 *
 * @function
 *
 * @param {string} date
 *
 * @returns {Dayjs[]}
 */
export const getMonthDates = (date?: string | Date | Dayjs): Dayjs[] => {
  const today = date ? dayjs(date) : dayjs();

  return [
    today.startOf('month'), // startDate of each month
    today.endOf('month'), // endDate of each month
    today
      .startOf('month')
      .add(14, 'day') // midDate (always 15th) of each month
      .endOf('date'),
  ];
};

/**
 * Returns dayjs object in a particular time.
 *
 * Note: This does not convert date passed in argument to the timezone.
 *
 * @param {string} timeZone
 * @param {string} date
 *
 * @returns {Dayjs} Returns dayjs object.
 */
export const getDayjsDateByTimezone = (
  timeZone = 'UTC',
  date?: string,
): Dayjs => {
  const parsedDate = date ? new Date(date) : new Date();

  if (timeZone === 'UTC') {
    return dayjs(parsedDate).clone();
  }

  return dayjs(parsedDate.toLocaleString('en-US', { timeZone })).clone();
};

/**
 * Returns dayjs object with toronto time.
 *
 * Note: This does not convert date passed in argument to the timezone.
 *
 * @param {string} timeZone
 *
 * @returns {Dayjs} Returns dayjs object.
 */
export const getTorontoDayjsDate = (date?: string): Dayjs => {
  return getDayjsDateByTimezone(TIMEZONES.toronto, date);
};

/**
 * Converts date time into toronto time.
 *
 * Note: The timezone will still be "UTC".
 *
 * @param {string} timeZone
 *
 * @returns {Dayjs} Returns dayjs object.
 */
export const convertToTorontoTime = (date?: string): Dayjs => {
  const currentTime = dayjs();
  const currentTorontoTime = getTorontoDayjsDate();

  const currentTorontoTimeInUTC = dayjs(
    currentTorontoTime.format(DATE_TIME_FORMAT),
  );

  const difference = currentTorontoTimeInUTC
    .clone()
    .diff(currentTime, 'second');

  const newDate = (date ? dayjs(date) : currentTime).clone();

  return newDate.add(difference, 'second');
};

/**
 * Checks if the year is a leap year.
 *
 * Refer: https://stackoverflow.com/questions/3220163/how-to-find-leap-year-programmatically-in-c/
 *
 * @function
 *
 * @param {number} year
 *
 * @returns {boolean} Returns true if leap year, else false.
 */
export const isLeapYear = (year?: number): boolean => {
  year = !year ? dayjs().get('year') : year;

  return (year & 3) == 0 && (year % 25 != 0 || (year & 15) == 0);
};

/**
 * Returns no. of days in the year.
 *
 * @function
 *
 * @param {number} year
 *
 * @returns {number} Returns number.
 */
export const daysInYear = (year?: number): number => {
  return isLeapYear(year) ? 366 : 365;
};

/**
 *
 * @param {string|Date|Dayjs} startDate
 * @param {string|Date|Dayjs} endDate
 *
 * @returns {DateInterval[]}
 */
export const getDateIntervals = (
  startDate: string | Date | Dayjs,
  endDate: string | Date | Dayjs,
): DateInterval[] => {
  const convertedEndDate = toDateDayjs(endDate);
  const convertedStartDate = toDateDayjs(startDate);

  if (!convertedStartDate || !convertedEndDate) {
    throw new Error('Start/end date is invalid.');
  }

  if (!convertedEndDate.isAfter(convertedStartDate)) {
    throw new Error('End date must be greater than start date.');
  }

  let current = convertedStartDate.startOf('date').clone();

  const dateIntervals: Array<{ startDate: Dayjs; endDate: Dayjs }> = [];

  while (
    !current.startOf('date').isSame(convertedEndDate.startOf('date'), 'date')
  ) {
    dateIntervals.push({
      startDate: current.clone(),
      endDate: current.clone().add(1, 'day'),
    });

    current = current.startOf('date').add(1, 'day');
  }

  return dateIntervals;
};

/**
 * Removes timezone offset from a date string.
 *
 * @param {string} dateStringWithTimezoneOffset
 *
 * @returns {string}
 */
export const removeTimezoneOffsetFromDateString = (
  dateStringWithTimezoneOffset: string,
): string => {
  if (!dateStringWithTimezoneOffset) {
    return null;
  }

  return `${dateStringWithTimezoneOffset.substr(
    0,
    dateStringWithTimezoneOffset.length - 5,
  )}.000Z`;
};
