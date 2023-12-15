import DistributionCard from '@/components/DistributionCard';
import { DistributionTitle } from '@/components/DistributionTitle';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { calculatePercent } from '@/utils/portfolio';
import { useArcherContext } from '@/utils/ArcherContextProvider';
import { FC, HTMLAttributes } from 'react';

export function SectorDiversity({
  className,
  ...otherProps
}: HTMLAttributes<HTMLElement>) {
  const { portfolio } = useArcherContext();
  const pieData = portfolio
    .filter((item) => item.amount > 0)
    .reduce(
      (acc, item) => {
        const sector = item.sector;
        if (acc[sector]) {
          acc[sector] += calculatePercent(portfolio, item);
        } else {
          acc[sector] = calculatePercent(portfolio, item);
        }
        return acc;
      },
      {} as Record<string, number>,
    );

  const pieDataArray = Object.entries(pieData).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <DistributionCard {...otherProps} className={`flex ${className ?? ''}`}>
      <div className="flex gap-[32px] items-center flex-grow">
        <div>
          <DistributionTitle className="mb-[16px]">
            Sector Diversity
          </DistributionTitle>
          <PieChart
            width={184}
            height={184}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <Pie
              data={pieDataArray}
              cx={92}
              cy={92}
              innerRadius={75}
              outerRadius={92}
              paddingAngle={0}
              blendStroke={true}
              dataKey="value"
            >
              {pieDataArray.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  style={{ outline: 'none' }}
                  fill={`var(--data${index + 1})`}
                />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </div>
        <div className="flex flex-col gap-[12px] flex-grow">
          {pieDataArray.map((item, index) => (
            <div
              className="flex items-center gap-x-[8px] text-[12px] leading-[16px]"
              key={item.name}
            >
              <div
                className={`w-[10px] h-[10px] rounded-[10px] bg-data${
                  index + 1
                }`}
              ></div>
              <div className="truncate max-w-[158px]" title={item.name}>
                {item.name}
              </div>
              <div className="font-extrabold justify-self-end flex-grow text-end">
                {Math.floor(item.value)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </DistributionCard>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PieTooltip: FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg2 py-2 px-4 border-1 border-text1 drop-shadow-card rounded">
        <p className="label">{`${
          payload[0].payload.name
        }: ${payload[0].value.toLocaleString()}%`}</p>
      </div>
    );
  }

  return null;
};
