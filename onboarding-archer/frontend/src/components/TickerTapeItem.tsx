import Select, {
  components,
  CSSObjectWithLabel,
  SingleValue,
} from 'react-select';
import Icon from '@/components/lib/Icon';
import { useArcherContext } from '@/utils/ArcherContextProvider';
import { useSquid } from '@squidcloud/react';
import PriceDisplay from '@/components/PriceDisplay';
import Tooltip from '@/components/Tooltip';
import { usePortfolio } from '@/components/hooks/usePortfolio';

export interface TickerOption {
  value: string;
  label: string;
  usdValue: number;
}

interface TickerTapeItemProps {
  tickerOptions: Array<TickerOption>;
  defaultOption?: TickerOption;
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomOption = ({ data, ...props }: any) => {
  return (
    <components.Option {...props}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[12px]">
          <Icon
            icon={data.value}
            className="w-[32px] h-[32px] rounded-[32px] border border-line1"
          ></Icon>
          <div className="font-semibold">{data.label}</div>
        </div>
        <div className="font-normal">
          <PriceDisplay value={data.usdValue} minimumFractionDigits={2} />
        </div>
      </div>
    </components.Option>
  );
};

export default function TickerTapeItem({
  tickerOptions,
  defaultOption,
  index,
}: TickerTapeItemProps) {
  const archerContextData = useArcherContext();
  const { replaceTicker, buyOrSellTicker } = usePortfolio();
  const { portfolio } = archerContextData;
  const squid = useSquid();

  function onTickerChanged(value: SingleValue<TickerOption>) {
    if (!value) return;
    squid
      .runInTransaction(async (txId: string) => {
        replaceTicker(portfolio[index].id, value.value, index, txId);
      })
      .then();
  }

  // noinspection JSUnusedGlobalSymbols
  return (
    <div className="flex items-center justify-between relative">
      {index === 0 && (
        <Tooltip
          className={'!absolute top-[-12px] right-[-13px] '}
          mdFile="buy_stock.md"
        ></Tooltip>
      )}

      <Select
        className="w-[180px] bg-bg2 !text !font-extrabold"
        classNames={{
          control: () => '!bg-bg2 pl-[0] pt-[5px] pb-[5px] pr-[0px]',
          valueContainer: () => '!pl-[22px]',
          indicatorSeparator: () => 'hidden',
          dropdownIndicator: () => '!text-text1 w-[14px] !p-[0] mr-[16px]',
        }}
        styles={{
          menu: (provided) =>
            ({
              ...provided,
              width: '344px',
            }) as CSSObjectWithLabel,
        }}
        defaultValue={defaultOption}
        components={{
          Option: CustomOption,
        }}
        options={tickerOptions.filter(
          (option) => option.value !== defaultOption?.value,
        )}
        isSearchable={true}
        onChange={onTickerChanged}
        name="ticker"
      />

      <div className="rounded-[100px] border border-line2 p-3 text text-text1 font-semibold flex items-center justify-between w-[140px]">
        <button onClick={() => buyOrSellTicker(portfolio[index].id, -1, index)}>
          <Icon
            icon="minus_button_icon"
            className="hover:opacity-80 active:opacity-70 cursor-pointer"
          ></Icon>
        </button>
        {portfolio[index].amount}
        <button onClick={() => buyOrSellTicker(portfolio[index].id, 1, index)}>
          <Icon
            icon="plus_button_icon"
            className="hover:opacity-80 active:opacity-70 cursor-pointer"
          ></Icon>
        </button>
      </div>
    </div>
  );
}
