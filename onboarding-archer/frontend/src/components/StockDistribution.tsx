import DistributionCard from '@/components/DistributionCard.tsx';
import { PortfolioItem } from '@/types/PortfolioTypes.ts';
import Holdings from '@/components/Holdings.tsx';
import { DistributionTitle } from '@/components/DistributionTitle.tsx';
import { SectorDiversity } from '@/components/SectorDiversity.tsx';
import { calculatePercent } from '@/utils/Portfolio.ts';

interface StockDistributionProps {
  portfolio: Array<PortfolioItem>;
}

export default function StockDistribution({
  portfolio,
}: StockDistributionProps) {
  return (
    <>
      <DistributionCard>
        <div className="flex justify-between items-start">
          <DistributionTitle className="w-[138px]">
            Stock Distribution and Performance
          </DistributionTitle>
          <div className="grid grid-cols-3 gap-x-[32px] gap-y-[8px]">
            {portfolio.map((item, index) => (
              <div
                className="flex items-center gap-x-[8px] text-[12px] leading-[16px]"
                key={item.tickerId}
              >
                <div
                  className={`w-[10px] h-[10px] rounded-[10px] bg-data${
                    index + 1
                  }`}
                ></div>
                <div>{item.tickerId}</div>
                <div className="font-extrabold">
                  {calculatePercent(portfolio, item)}%
                </div>
                <div
                  className={
                    item.changeFromYesterdayPercent >= 0
                      ? 'text-gain1'
                      : 'text-lose1'
                  }
                >
                  (
                  {(item.changeFromYesterdayPercent >= 0 ? '+' : '') +
                    item.changeFromYesterdayPrice.toFixed(3)}
                  )
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          id="progress_bar_container"
          className="flex items-center w-full h-[6px] mt-[16px]"
        >
          {portfolio.map((item, index) => {
            const width = calculatePercent(portfolio, item);
            return (
              <div
                key={item.tickerId}
                style={{ width: `${width}%` }}
                className={`h-full w-[${calculatePercent(
                  portfolio,
                  item,
                )}%] bg-data${index + 1}`}
              ></div>
            );
          })}
        </div>
      </DistributionCard>
      <div className="flex justify-between mt-[32px]">
        <SectorDiversity
          portfolio={portfolio}
          className="basis-[468px]"
        ></SectorDiversity>
        <div className="basis-[260px]">
          <Holdings portfolio={portfolio}></Holdings>
          <DistributionCard className="mt-[32px]">
            right bottom
          </DistributionCard>
        </div>
      </div>
    </>
  );
}
