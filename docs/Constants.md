# Constants

## Available constants

### Cron

Mainly to be used for NestJS bull integration.

| Name                | Value          |
| ------------------- | -------------- |
| CRON_EVERY_MINUTE   | `* * * * *`    |
| CRON_EVERY_1AM      | `0 1 * * *`    |
| CRON_EVERY_2AM      | `0 2 * * *`    |
| CRON_EVERY_3AM      | `0 3 * * *`    |
| CRON_EVERY_4AM      | `0 4 * * *`    |
| CRON_EVERY_5AM      | `0 5 * * *`    |
| CRON_EVERY_6AM      | `0 6 * * *`    |
| CRON_EVERY_7PM      | `0 19 * * *`   |
| CRON_EVERY_8PM      | `0 20 * * *`   |
| CRON_EVERY_9PM      | `0 21 * * *`   |
| CRON_EVERY_10PM     | `0 22 * * *`   |
| CRON_EVERY_11PM     | `0 23 * * *`   |
| CRON_EVERY_1_HOUR   | `0 */1 * * *`  |
| CRON_EVERY_3_HOURS  | `0 */3 * * *`  |
| CRON_EVERY_4_HOURS  | `0 */4 * * *`  |
| CRON_EVERY_6_HOURS  | `0 */6 * * *`  |
| CRON_EVERY_8_HOURS  | `0 */8 * * *`  |
| CRON_EVERY_12_HOURS | `0 */12 * * *` |
| CRON_EVERY_MIDNIGHT | `0 0 * * *`    |
| CRON_EVERY_HALFHOUR | `*/30 * * * *` |

### Database

Usually used to establish database connections

| Name          | Value                                                                              |
| ------------- | ---------------------------------------------------------------------------------- |
| CONNECTIONS   | `{ primary: 'primary', secondary: 'secondary' }`                                   |
| DATABASE_TYPE | `{ mysql: 'mysql', mariadb: 'mariadb', mongodb: 'mongodb', postgres: 'postgres' }` |

### Dates

Usually used for Date/Time conversion.

| Name                     | Value                                   |
| ------------------------ | --------------------------------------- |
| DATE_FORMAT              | `YYYY-MM-DD`                            |
| DATE_FORMAT_SLASHES      | `YYYY/MM/DD`                            |
| DATE_FORMAT_INVOICE_ITEM | `MM/DD/YYYY`                            |
| DATE_TIME_FORMAT         | `YYYY-MM-DD HH:mm:ss`                   |
| TIMEZONES                | `{ toronto: 'America/Toronto', //... }` |
| DATE_TIME_ISO_FORMAT     | `YYYY-MM-DDTHH:mm:ssZ`                  |

### Files

Will add soon...

### Jobs

Will add soon...

### Model Errors

Will add soon...

### Pagination

Will add soon...

### Queues

Will add soon...
