Squid AI works with your data to provide the domain-specific insights that you and your users need.
You can integrate the Squid AI capabilities from the [Squid Cloud Console](https://console.squid.cloud/integrations/available/ai)
Then you can use the Squid SDK to provide AI capabilities to your users based on your data.

In the `backend/src/service/onboarding-archer-service.ts` file, include the code below:

```typescript
import { scheduler, SquidService } from '@squidcloud/backend';

export class OnboardingArcherService extends SquidService {
  // ...
  @scheduler('regenerateTickerPricesJob', CronExpression.EVERY_10_SECONDS, true)
  async regenerateTickerPricesJob(): Promise<void> {
    await this.generatePortfolio();
  }
  // ...
}
```

For a detailed explanation review our schedulers [documentation](https://docs.squid.cloud/docs/development-tools/backend/schedulers)
