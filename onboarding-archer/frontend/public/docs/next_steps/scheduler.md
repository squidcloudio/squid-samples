A scheduler is a type of decorator that, when applied to a function, causes the function to be executed at regular
intervals. The scheduling is specified using a cron expression.

Let's build a scheduler that refreshes the portfolio every 10 minutes.

While this is not recommended for a real trading system, it serves as a good illustration of scheduler creation.

Creating a scheduler involves writing a TypeScript function with a `@scheduler` decorator.

In the `backend/src/service/onboarding-archer-service.ts` file, include the code below:

```typescript
import { scheduler, SquidService } from '@squidcloud/backend';
import { CronExpression } from '@squidcloud/common';

export class OnboardingArcherService extends SquidService {
  // ...
  @scheduler('regenerateTickerPricesJob', CronExpression.EVERY_10_MINUTES, true)
  async regenerateTickerPricesJob(): Promise<void> {
    await this.generatePortfolio();
  }

  // ...
}
```

For a detailed explanation review our
schedulers [documentation](https://docs.squid.cloud/docs/development-tools/backend/schedulers)
