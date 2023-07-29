import TickerTapeItem, { TickerOption } from '@/components/TickerTapeItem.tsx';
import Button from '@/components/Button.tsx';
import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';
import { useCollection } from '@squidcloud/react';
import { PortfolioItem } from '@/common/common-types.ts';
import { useEffect } from 'react';

export default function TickerTape() {
  const portfolioCollection = useCollection<PortfolioItem>('portfolio');
  const { portfolio, allTickers } = useArcherContext();
  const tickerOptions: Array<TickerOption> = allTickers.map((ticker) => ({
    label: ticker.id,
    value: ticker.id,
  }));

  useEffect(() => {
    if (!portfolio.length) {
      const randomStartIndex = Math.floor(
        Math.random() * (tickerOptions.length - 5),
      );
      const randomPreselectedTickers = tickerOptions.slice(
        randomStartIndex,
        randomStartIndex + 5,
      );
      for (let i = 0; i < randomPreselectedTickers.length; i++) {
        const ticker = randomPreselectedTickers[i];
        portfolioCollection
          .doc(i.toString())
          .insert({
            tickerId: ticker.value,
            amount: 1,
            indexInUi: i,
          })
          .then();
      }
    }
  }, [portfolio]);

  return (
    <div className="h-full flex flex-col">
      <div className="text-[20px] leading-[100%] font-extrabold mb-4">
        Ticker Tape Value
      </div>
      <div className="flex flex-col gap-[16px]">
        {portfolio.map((item, index) => (
          <TickerTapeItem
            key={item.id}
            tickerOptions={tickerOptions}
            defaultOption={{
              label: item.id,
              value: item.id,
            }}
            index={index}
          />
        ))}
      </div>
      <div>
        <div className="w-full h-[1px] bg-text3 my-[20px]"></div>
        <div className="flex justify-between items-center">
          <div className="text-[16px] leading-[20px] font-semibold">
            Cash balance
          </div>
          <div className="text-[16px] leading-[20px] font-extrabold">
            $6,524
          </div>
        </div>
      </div>
      <div className="mt-14 flex-grow">
        <div className="grid grid-cols-2 gap-[12px]">
          <Button buttonType="primary">Run</Button>
          <Button buttonType="secondary">Regenerate</Button>
        </div>
      </div>
      <div className="mt-9 text-text2 text-[12px] font-medium leading-[16px]">
        <span className="font-extrabold">Disclaimer: </span>
        Please note that the historical stock data provided here is for
        demonstration purposes only and should not be considered as real or
        accurate.
      </div>
    </div>
  );
}
