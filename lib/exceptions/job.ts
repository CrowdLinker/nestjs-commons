import { BaseException } from './base';

export const JobExceptionError = {
  SIMILAR_JOB_ALREADY_ACTIVE:
    'There is a similar job already active in the queue.',
  SIMILAR_JOB_ALREADY_WAITING:
    'There is a similar job already waiting in the queue.',
};

/**
 * Job Exception class.
 *
 * @throws {JobException}
 */
export class JobException extends BaseException {}
