import { JobOptions } from 'bull';

export const DEFAULT_JOB_OPTIONS: JobOptions = {
  removeOnComplete: true,
  backoff: 600000, // 10 mins (In ms),
  attempts: 2,
};
