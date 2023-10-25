# Running an executable on the backend

For some tasks, it's better to use backend functions. This button triggers a backend function that regenerates your
portfolio. Using the Squid SDK, it's as straightforward as calling a function on the client side.

Frontend code:

```typescript
squid.executeFunction('generatePortfolio').then();
```

Backend code (trimmed down version):

```typescript
export class OnboardingArcherService extends SquidService {
  @executable()
  async generatePortfolio(): Promise<void> {
    const allTickers = _.shuffle(await this.getAllTickers());
    await this.squid.runInTransaction(async (txId) => {
      for (let i = 0; i < allTickers.slice(0, 5).length; i++) {
        const ticker = allTickers.slice(0, 5)[i];
        const amount = Math.floor(Math.random() * 10) + 1;
        await this.portfolioCollection
          .doc(String(i))
          .insert({ tickerId: ticker.id, amount, indexInUi: i }, txId);
      }
    });
  }
}
```

For additional details, see the <a target="_blank" href="https://docs.squid.cloud/docs/development-tools/backend/executables">
documentation</a>.
