# Using schedulers

To mimic realtime market changes, this sample app periodically updates the portfolio value. This is done using a
scheduler that runs as a backend function.
Implementing such scheduler is as easy as writing a function and annotating it with `@scheduler()`.

```typescript
export class OnboardingArcherService extends SquidService {
  // ...
  @scheduler('generateTickerPricesJob', CronExpression.EVERY_10_SECONDS, true)
  async generateTickerPricesJob(): Promise<void> {
    const allTickersInDb = await this.tickerCollection
      .query()
      .dereference()
      .snapshot();

    const allTickers = allTickersInDb.length ? allTickersInDb : ALL_TICKERS;

    await this.squid.runInTransaction(async (txId) => {
      for (const ticker of allTickers) {
        await this.generateTickerPrice(ticker, txId);
      }
    });
  }

  // ...
}
```

For additional details, see the <a target="_blank" href="https://docs.squid.cloud/docs/development-tools/backend/schedulers">
documentation</a>.
