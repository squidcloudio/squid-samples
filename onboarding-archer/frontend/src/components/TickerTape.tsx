import TickerTapeItem, { TickerOption } from '@/components/TickerTapeItem';
import Button from '@/components/lib/Button';
import { useArcherContext } from '@/utils/ArcherContextProvider';
import { useEffect, useState } from 'react';
import PriceDisplay from '@/components/PriceDisplay';
import { useSquid } from '@squidcloud/react';
import Tooltip from '@/components/Tooltip';

export default function TickerTape() {
  const squid = useSquid();
  const archerContextData = useArcherContext();
  const { portfolio, allTickers, userProfile, setNextStepsModalOpen } =
    archerContextData;
  const [ongoingServerRequest, setOngoingServerRequest] = useState(false);

  const tickerOptions: Array<TickerOption> = allTickers.map((ticker) => ({
    label: ticker.id,
    value: ticker.id,
    usdValue: ticker.closePrice,
  }));

  function runSimulation() {
    if (ongoingServerRequest) return;
    setOngoingServerRequest(true);
    squid.executeFunction('runSimulation').finally(() => {
      setOngoingServerRequest(false);
    });
  }

  function generatePortfolio() {
    if (ongoingServerRequest) return;
    setOngoingServerRequest(true);
    squid.executeFunction('generatePortfolio').finally(() => {
      setOngoingServerRequest(false);
    });
  }

  function showNextSteps() {
    setNextStepsModalOpen(true);
  }

  useEffect(() => {
    if (!portfolio.length) {
      generatePortfolio();
    }
  }, [portfolio]);

  return (
    <div className="h-full flex flex-col">
      <div className="text-[20px] leading-[100%] font-extrabold mb-2 flex items-center h-[36px]">
        Ticker Tape Value
        <Tooltip className={'ml-2'} mdFile="queries-tooltip.md"></Tooltip>
      </div>
      <div className="flex flex-col gap-[16px]">
        {portfolio.map((item, index) => (
          <TickerTapeItem
            key={item.id || index}
            tickerOptions={tickerOptions}
            defaultOption={{
              label: item.id,
              value: item.id,
              usdValue: item.closePrice,
            }}
            index={index}
          />
        ))}
      </div>
      <div>
        <div className="w-full h-[1px] bg-text3 my-[20px]"></div>
        <div className="flex justify-between items-center">
          <div className="text leading-[20px] font-semibold">Cash balance</div>
          <div className="text leading-[20px] font-extrabold">
            <PriceDisplay
              value={userProfile?.balance}
              minimumFractionDigits={2}
            />
          </div>
        </div>
      </div>
      <div className="mt-14 flex-grow">
        <div className="grid grid-cols-2 gap-[12px]">
          <div className={'relative'}>
            <Button
              className={'w-full'}
              buttonType="primary"
              onClick={runSimulation}
              disabled={ongoingServerRequest}
            >
              Run
            </Button>
          </div>

          <div className={'relative'}>
            <Tooltip
              className={'!absolute top-[-12px] right-[-13px] '}
              mdFile="regenerate_button.md"
            ></Tooltip>
            <Button
              className={'w-full'}
              buttonType="secondary"
              onClick={generatePortfolio}
              disabled={ongoingServerRequest}
            >
              Regenerate
            </Button>
          </div>
        </div>
        <Button
          className={'w-full mt-[12px] font-extrabold'}
          buttonType="modal"
          onClick={showNextSteps}
        >
          What's next...
        </Button>
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
