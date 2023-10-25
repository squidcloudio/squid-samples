import { Fragment } from 'react';

export type SelectedChartTime = 'w1' | 'w2' | 'w3' | 'w4' | '1m';

interface TimeSelectorOption {
  label: string;
  value: SelectedChartTime;
  separator?: boolean;
}

interface TimeSelectorProps {
  selectedChartTime: SelectedChartTime;
  setSelectedChartTime: (value: SelectedChartTime) => void;
  isDataGenerated: boolean;
  gained: boolean;
}

const options: Array<TimeSelectorOption> = [
  { label: 'W1', value: 'w1' },
  { label: 'W2', value: 'w2' },
  { label: 'W3', value: 'w3' },
  { label: 'W4', value: 'w4' },
  { label: '1M', value: '1m', separator: true },
];

export default function TimeSelector({
  selectedChartTime,
  setSelectedChartTime,
  isDataGenerated,
  gained,
}: TimeSelectorProps) {
  return (
    <div
      className={`py-1 px-4 bg-bg4 rounded-[8px] flex gap-[12px] items-center`}
    >
      {options.map((option) => {
        return (
          <Fragment key={option.value}>
            {option.separator && (
              <div className="w-[1px] h-[18px] bg-line1"></div>
            )}
            <div
              onClick={() => setSelectedChartTime(option.value)}
              className={`py-[6px] px-[8px] bg-bg4 text-text2 rounded-[6px] text-[12px] leading-[16px] font-extrabold cursor-pointer ${
                !isDataGenerated && 'grayscale'
              } ${gained ? 'hover:bg-gain3' : 'hover:bg-lose3'} ${
                selectedChartTime === option.value
                  ? `${gained ? '!bg-gain1' : '!bg-lose1'} !text-bg1`
                  : ''
              }`}
            >
              {option.label}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
