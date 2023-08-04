# Querying data

To get the list of tickers, we need to query the DB. This can be done using the Squid SDK as follows:

```typescript
// Getting the collection reference using the Squid useCollection react hook
const tickerCollection = useCollection<Ticker>('ticker');

// Querying the collection and subscribing for updates
const allTickersResponse = useQuery<Ticker>(
  tickerCollection.query(),
  true /* subscribe */
);
```

Each time a document (ticker) changes, the query result updates in real-time.
