# Querying Data

To retrieve a list of tickers, query the DB using the Squid SDK:

```typescript
// Use Squid's useCollection React hook to get the collection reference
const tickerCollection = useCollection<Ticker>('ticker');

// Query the collection and subscribe for updates
const allTickersResponse = useQuery<Ticker>(
  tickerCollection.query(),
  true, // this enables real-time updates to the query result
);
```

The query result updates in real-time when a document (ticker) changes. Squid has many querying capabilities.

For additional details, see the <a target="_blank" href="https://docs.squid.cloud/docs/development-tools/client-sdk/queries">
documentation</a>.
