import Select from 'react-select';
import Icon from '@/components/lib/Icon.tsx';
import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';
import { buyOrSellTicker, replaceTicker } from '@/utils/portfolio.ts';
import { useCollection, useSquid } from '@squidcloud/react';
import { PortfolioItem, UserProfile } from '@/common/common-types.ts';

export interface TickerOption {
  value: string;
  label: string;
}

interface TickerTapeItemProps {
  tickerOptions: Array<TickerOption>;
  defaultOption?: TickerOption;
  index: number;
}

export default function TickerTapeItem({
  tickerOptions,
  defaultOption,
  index,
}: TickerTapeItemProps) {
  const archerContextData = useArcherContext();
  const { portfolio } = archerContextData;
  const squid = useSquid();
  const portfolioCollection = useCollection<PortfolioItem>('portfolio');
  const userProfileCollection = useCollection<UserProfile>('userProfile');
  // noinspection JSUnusedGlobalSymbols
  return (
    <div className="flex items-center justify-between">
      <Select
        className="w-[180px] bg-bg2 !text-[16px] !font-extrabold"
        classNames={{
          control: () => '!bg-bg2 pl-[0] pt-[5px] pb-[5px] pr-[0px]',
          valueContainer: () => '!pl-[22px]',
          indicatorSeparator: () => 'hidden',
          dropdownIndicator: () => '!text-text1 w-[14px] !p-[0] mr-[16px]',
        }}
        defaultValue={defaultOption}
        options={tickerOptions}
        isSearchable={true}
        onChange={(value) => {
          if (!value) return;
          squid
            .runInTransaction(async (txId: string) => {
              replaceTicker(
                archerContextData,
                portfolioCollection,
                userProfileCollection,
                portfolio[index].id,
                value.value,
                index,
                txId,
              );
            })
            .then();
        }}
        name="ticker"
      />

      <div className="rounded-[100px] border-[1px] border-line2 p-3 text-[16px] text-text1 font-semibold flex items-center justify-between w-[140px]">
        <button
          onClick={() =>
            buyOrSellTicker(
              archerContextData,
              portfolioCollection,
              userProfileCollection,
              portfolio[index].id,
              -1,
              index,
            )
          }
        >
          <Icon
            icon="minus_button_icon"
            className="hover:opacity-80 active:opacity-70 cursor-pointer"
          ></Icon>
        </button>
        {portfolio[index].amount}
        <button
          onClick={() =>
            buyOrSellTicker(
              archerContextData,
              portfolioCollection,
              userProfileCollection,
              portfolio[index].id,
              1,
              index,
            )
          }
        >
          <Icon
            icon="plus_button_icon"
            className="hover:opacity-80 active:opacity-70 cursor-pointer"
          ></Icon>
        </button>
      </div>
    </div>
  );
}
