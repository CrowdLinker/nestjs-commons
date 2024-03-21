# NestJS Commons

Commons for NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="380" alt="Nest Logo" />
  </a>
</p>

## Packages

- [Lodash](https://www.npmjs.com/package/lodash/v/4.17.21) - lodash (v4.17.21)

## Installation

```bash
npm install --save @crowdlinker/nestjs-commons
// or
// yarn add @crowdlinker/nestjs-commons
```

## Usage

### Constants

#### Example

```ts
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@crowdlinker/nestjs-commons/constants/date';

new days().format(DATE_FORMAT); // 2021-05-21
```

### Helpers

Helpers are common functions used throughout the codebase for performing some basic operations.

#### Example

```ts
import { isLeapYear } from '@crowdlinker/nestjs-commons/helpers/date';

if (isLeapYear()) {
  // const noOfDays = 366;
} else {
  // const noOfDays = 365;
}
```

### HttpExceptionFilter

To know about what an HttpExceptionFilter is, please read the [NestJS documentation](https://docs.nestjs.com/exception-filters#binding-filters).

```ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigService } from './config/app/config.service';
import { HttpExceptionFilter } from '@crowdlinker/nestjs-commons/exceptions/filters/http-exception';

@Module({
  imports: [
    // ...
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useFactory: async (appConfigService: AppConfigService) => {
        return new HttpExceptionFilter(appConfigService);
      },
    },
  ],
})
export class AppModule {}
```

**Note:** AppConfigService should implement AppConfigServiceInterface provided in `@crowdlinker/nestjs-commons/interfaces/config.interface. See example below:

```ts
import { Injectable } from '@nestjs/common';
import { AppConfig } from './config.interface';
import { ConfigService } from '@nestjs/config';
import { AppConfigServiceInterface } from '@crowdlinker/nestjs-commons/interfaces/config';

@Injectable()
export class AppConfigService implements AppConfigServiceInterface {
  // ....
}
```

## Important Points To Note

- Code is written in Typescript (v5.4.3)

## Contributors

- Team @Crowdlinker ([Github](https://github.com/CrowdLinker) | [Bitbucket](https://bitbucket.org/crowdlinker/))
