import Select from 'react-select';
import Icon from '@/components/lib/Icon.tsx';

interface TickerOption {
  value: string;
  label: string;
}

export default function TickerTapeItem() {
  const items: Array<TickerOption> = [
    { value: 'AAPL', label: 'AAPL' },
    { value: 'MSFT', label: 'MSFT' },
  ];

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
        defaultValue={items[0]}
        options={items}
        isSearchable={true}
        name="ticker"
      />

      <div className="rounded-[100px] border-[1px] border-line2 p-3 text-[16px] text-text1 font-semibold flex items-center justify-between w-[140px]">
        <Icon
          icon="minus_button_icon"
          className="hover:opacity-80 active:opacity-70 cursor-pointer"
        ></Icon>
        100
        <Icon
          icon="plus_button_icon"
          className="hover:opacity-80 active:opacity-70 cursor-pointer"
        ></Icon>
      </div>
    </div>
  );
}
