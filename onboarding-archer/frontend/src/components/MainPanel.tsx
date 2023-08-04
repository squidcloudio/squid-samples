import ChartAndData from '@/components/ChartAndData.tsx';
import DistributionAndDiversity from '@/components/DistributionAndDiversity.tsx';
import Tooltip from '@/components/Tooltip.tsx';

export default function MainPanel() {
  return (
    <div>
      <div className="text-[16px] text-text1 mb-4 font-extrabold flex items-center h-[36px]">
        Portfolio Performance
        <Tooltip className={'ml-2'} mdFile="portfolio_performance.md"></Tooltip>
      </div>
      <div>
        <ChartAndData />
        <DistributionAndDiversity />
      </div>
    </div>
  );
}
