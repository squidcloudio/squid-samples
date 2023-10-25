import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import Icon from '@/components/lib/Icon';
import { FC, memo } from 'react';
import * as _ from 'lodash';

export interface SimulationData {
  name: string;
  value: number;
}

interface ChartProps {
  data: Array<SimulationData>;
  gained: boolean;
}

const CustomTooltip: FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg2 py-2 px-4 border-1 border-text1 drop-shadow-card rounded">
        <p className="label">{`${label ?? payload[0].payload.name}: $${(
          payload[0].value || 0
        ).toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

export const Chart = ({ data, gained }: ChartProps) => {
  const values = data.map((item) => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = 0.02; // Padding
  const domain = [minValue - minValue * padding, maxValue + maxValue * padding];

  return !data.length ? (
    <div className="mt-[63px] pb-[32px]">
      <div className="w-full h-[172px] relative flex justify-center">
        <div className="max-w-[426px] text-center text-text2 text leading-[20px] font-semibold mt-[32px]">
          Select or update stock holdings on the left panel then view your
          simulation by clicking the run button
        </div>
        <Icon
          icon={'chart_skeleton'}
          className="w-full h-full absolute top-0 left-0 z-[-1]"
        />
      </div>
    </div>
  ) : (
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
          stroke={gained ? 'var(--gain1)' : 'var(--lose1)'}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default memo(Chart, (prevProps, nextProps) =>
  _.isEqual(prevProps.data, nextProps.data),
);
