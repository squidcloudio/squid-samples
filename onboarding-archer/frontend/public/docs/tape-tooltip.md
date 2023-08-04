# Header

Notice how the Sector Diversity and Stock Distribution graphs update real-time. With Squid, you can create subscriptions
to a document using snapshots. Each time the document changes, all subscriptions automatically update in real time.

```typescript
 users = this.squid
  .collection<User>('users')
  .query()
  .snapshots()
  .pipe(map((users) => users.map((user) => user.data)));
```

Each time the document changes, all subscriptions automatically update in real time
