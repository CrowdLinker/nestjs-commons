export const QUEUES = {
  DEFAULT: 'default',
};

export const QUEUES_LIMIT_MAX = {
  DEFAULT: 3,
  SCRAPE: 1,
};

export const QUEUES_LIMIT_DURATION = {
  DEFAULT: 30000, // 30 seconds
  SCRAPE: 60000, // 1 min
};

export const QUEUES_LOCK_DURATION = {
  DEFAULT: 60000, // 1 min
  SCRAPE: 300000, // 5 mins
};

export const QUEUES_STALLED_INTERVAL = {
  DEFAULT: 60000, // 1 min
  SCRAPE: 300000, // 5 mins
};
