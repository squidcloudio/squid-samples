import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface StockData {
  name: string;
  value: number;
}

const data: Array<StockData> = [
  { name: 'Day 1', value: 2400 },
  { name: 'Day 2', value: 2210 },
  { name: 'Day 3', value: 2290 },
  { name: 'Day 4', value: 2000 },
  { name: 'Day 5', value: 2181 },
];

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg2 py-2 px-4 border-1 border-text1 drop-shadow-card rounded">
        <p className="label">{`${
          label ?? payload[0].payload.name
        }: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={235}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" interval={0} stroke="var(--text1)" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--gain1)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
