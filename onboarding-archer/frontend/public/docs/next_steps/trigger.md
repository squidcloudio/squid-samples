Similar to database triggers, Squid offers a way to execute a function in response to a change in the database. This is
achieved by decorating a function with the `@trigger` decorator within a class that extends the base `SquidService`
class.

Example of a trigger that prints changes to portfolio items:

```typescript
import { SquidService, trigger } from '@squidcloud/backend';
import { TriggerRequest } from '@squidcloud/common';
import { PortfolioItem } from './common-types';

export class OnboardingArcherService extends SquidService {
  // ...
  @trigger('tradeLogTrigger', 'portfolio')
  tradeLogTrigger(request: TriggerRequest<PortfolioItem>): void {
    const before = request.docBefore;
    const after = request.docAfter;
    const tickerId = before?.tickerId || after?.tickerId;
    switch (request.mutationType) {
      case 'delete':
        console.log(`Deleted ${tickerId}`);
        break;
      case 'update':
        console.log(
          `Updated ${tickerId} from ${before?.amount} to ${after?.amount}`,
        );
        break;
      case 'insert':
        console.log(`Inserted ${tickerId} with amount ${after?.amount}`);
        break;
    }
  }
  // ...
}
```

For a detailed explanation review our
trigger [documentation](https://docs.squid.cloud/docs/development-tools/backend/triggers)
