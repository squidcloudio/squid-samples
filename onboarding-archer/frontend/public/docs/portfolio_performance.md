# Binding query results to a charting library

To show the chart below, we need to get data from the database, transform it to the format the charting library expects
and re-render every time the data changes. This is easily done using queries with the Squid SDK:

```tsx
const simulationDayCollection = useCollection<SimulationDay>('simulationDay');

const { data } = useQuery(
  simulationDayCollection
    .query()
    .gte('date', startDate)
    .lt('date', endDate)
    .sortBy('date')
);

const simulationData: Array<SimulationData> = data.map((simulationDay, i) => {
  data.push({ name: `Day ${i + 1}`, value: simulationDay.value });
});

return <Chart data={simulationData} />;
```

For additional details, see the <a target="_blank" href="https://docs.squid.cloud/docs/development-tools/client-sdk/queries">
documentation</a>.
