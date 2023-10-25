import Icon from '@/components/lib/Icon';

interface GainLoseIndicatorProps {
  percentChange: number;
}

export default function GainLoseIndicator({
  percentChange,
}: GainLoseIndicatorProps) {
  const gain = percentChange > 0;
  const displayPercentChange = `${gain ? '+' : ''}${percentChange.toFixed(2)}%`;
  return (
    <div
      className={`flex items-center bg-bg4 py-[4px] px-[12px] rounded-[100px] text-[12px] font-extrabold leading-[16px] tracking-[0.48px] ${
        gain ? 'text-gain1' : 'text-lose1'
      }`}
    >
      {displayPercentChange}
      <Icon
        icon="up_arrow"
        className={`ml-[8px] ${gain ? '' : 'rotate-180'}`}
      ></Icon>
    </div>
  );
}
