import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface SimulationData {
  name: string;
  value: number;
}

interface ChartProps {
  data: Array<SimulationData>;
}

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

export default function Chart({ data }: ChartProps) {
  const values = data.map((item) => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = 0.02; // Padding
  const domain = [minValue - minValue * padding, maxValue + maxValue * padding];

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
        <YAxis domain={domain} axisLine={false} tick={false} width={0} />
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
