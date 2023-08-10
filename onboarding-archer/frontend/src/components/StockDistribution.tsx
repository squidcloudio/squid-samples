import DistributionCard from '@/components/DistributionCard';
import Holdings from '@/components/Holdings';
import { DistributionTitle } from '@/components/DistributionTitle';
import { SectorDiversity } from '@/components/SectorDiversity';
import { calculatePercent } from '@/utils/portfolio';
import Shares from '@/components/Shares';
import { useArcherContext } from '@/utils/ArcherContextProvider';
import Tooltip from '@/components/Tooltip';

export default function StockDistribution() {
  const { portfolio } = useArcherContext();

  return (
    <>
      <div
        className={
          'flex items-center h-[36px] mb-[10px] text font-extrabold leading-[100%]'
        }
      >
        Portfolio
        <Tooltip className={'ml-2'} mdFile="portfolio_section.md"></Tooltip>
      </div>
      <DistributionCard className={'gray_out_in_inspection_mode'}>
        <div className="flex justify-between items-start">
          <DistributionTitle className="w-[138px]">
            Stock Distribution and Performance
          </DistributionTitle>
          <div className="grid grid-cols-3 gap-x-[32px] gap-y-[8px]">
            {portfolio.map((item, index) => (
              <div
                className="flex items-center gap-x-[8px] text-[12px] leading-[16px]"
                key={item.id || index}
              >
                <div
                  className={`w-[10px] h-[10px] rounded-[10px] bg-data${
                    index + 1
                  }`}
                ></div>
                <div>{item.id}</div>
                <div className="font-extrabold">
                  {Math.floor(calculatePercent(portfolio, item))}%
                </div>
                <div
                  className={
                    item.changeFromPrevClosePercent >= 0
                      ? 'text-gain1'
                      : 'text-lose1'
                  }
                >
                  (
                  {(item.changeFromPrevClosePercent >= 0 ? '+' : '') +
                    item.changeFromPrevClosePrice}
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
                key={item.id}
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
      <div className="gray_out_in_inspection_mode flex justify-between mt-[32px]">
        <SectorDiversity className="basis-[468px]"></SectorDiversity>
        <div className="basis-[260px]">
          <Holdings />
          <Shares className="mt-[32px]" />
        </div>
      </div>
    </>
  );
}
