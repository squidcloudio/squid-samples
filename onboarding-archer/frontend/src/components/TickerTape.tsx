import TickerTapeItem, { TickerOption } from '@/components/TickerTapeItem.tsx';
import Button from '@/components/Button.tsx';
import { ALL_TICKERS } from '@/common/common-types.ts';

export default function TickerTape() {
  const tickerOptions: Array<TickerOption> = ALL_TICKERS.map((ticker) => ({
    value: ticker.id,
    label: ticker.id,
  }));
  const startIndex = Math.floor(Math.random() * (tickerOptions.length - 5));
  const preselectedTickers = tickerOptions.slice(startIndex, startIndex + 5);

  return (
    <div className="h-full flex flex-col">
      <div className="text-[20px] leading-[100%] font-extrabold mb-4">
        Ticker Tape Value
      </div>
      <div className="flex flex-col gap-[16px]">
        {preselectedTickers.map((item) => (
          <TickerTapeItem
            key={item.label}
            tickerOptions={tickerOptions}
            selectedTickerOption={item}
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
