import DistributionCard from '@/components/DistributionCard.tsx';
import { PortfolioItem } from '@/types/PortfolioTypes.ts';

interface StockDistributionProps {
  portfolio: Array<PortfolioItem>;
}

export default function StockDistribution({
  portfolio,
}: StockDistributionProps) {
  return (
    <DistributionCard className="">
      <div className="flex justify-between items-start">
        <div className="text-[16px] font-extrabold leading-[100%] w-[138px]">
          Stock Distribution and Performance
        </div>
        <div className="flex gap-x-[12px] gap-y-[8px]">
          {portfolio.map((item, index) => (
            <div className="flex items-center" key={item.tickerId}>
              <div
                className={`w-[10px] h-[10px] rounded-[10px] mr-[8px] bg-data${
                  index + 1
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </DistributionCard>
  );
}
