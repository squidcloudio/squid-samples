Now that you have completed onboarding with the Archer lite demo app take it further and explore adding backend functions:

To create a scheduler within Archer Ticker Tape:

* Install the Squid Client SDK:

```sh
npm install @squidcloud/client
```

* Fetch data
```typescript
import { Squid } from '@squidcloud/client';

const squid = new Squid({ appId: '<my app Id>' });
```

For a detailed explanation review our schedulers [documentation](https://docs.squid.cloud)
