# Mutations

When trading stocks, we need to update the amount of stocks in the user's portfolio and the user's balance. We can do
this atomically with a Squid SDK using transactions:

```typescript
// Parameters we receive
const { userProfileId, amount, indexInUi, tickerId } = buyOrSellParams;

// Initial setup
const squid = useSquid();
const portfolioCollection = useCollection<PortfolioItem>('portfolio');
const userProfileCollection = useCollection<UserProfile>('userProfile');
const userProfileDoc = userProfileCollection.doc(userProfileId);

// Modify data atomically in a Squid transaction
this.squid.runInTransaction((txId) => {
  userProfileDoc.incrementInPath('balance', -usdValue, txId).then();
  const portfolioDoc = portfolioCollection.doc(String(indexInUi));
  portfolioDoc.incrementInPath('amount', amount, txId).then();
});
```

For additional details, see the <a target="_blank" href="https://docs.squid.cloud/docs/development-tools/client-sdk/mutations">
documentation</a>.
