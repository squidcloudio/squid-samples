import ChartAndData from '@/components/ChartAndData';
import DistributionAndDiversity from '@/components/DistributionAndDiversity';
import Tooltip from '@/components/Tooltip';

export default function MainPanel() {
  return (
    <div>
      <div className="text text-text1 mb-4 font-extrabold flex items-center h-[36px]">
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
