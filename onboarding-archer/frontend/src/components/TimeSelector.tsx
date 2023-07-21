interface TimeSelectorOption {
  label: string;
  value: string;
  separator?: boolean;
}

const options: Array<TimeSelectorOption> = [
  { label: 'W1', value: 'w1' },
  { label: 'W2', value: 'w2' },
  { label: 'W3', value: 'w3' },
  { label: 'W4', value: 'w4' },
  { label: '1M', value: '1m', separator: true },
];

export default function TimeSelector() {
  const gain = true;
  const selectedValue = 'w1';
  return (
    <div
      className={`py-1 px-4 bg-bg4 rounded-[8px] flex gap-[12px] items-center`}
    >
      {options.map((option) => {
        return (
          <>
            {option.separator && (
              <div className="w-[1px] h-[18px] bg-line1"></div>
            )}
            <div
              className={`py-[6px] px-[8px] bg-bg4 text-text2 rounded-[6px] text-[12px] leading-[16px] font-extrabold cursor-pointer ${
                gain ? 'hover:bg-gain2' : 'hover:bg-lose2'
              } ${
                selectedValue === option.value
                  ? `${gain ? '!bg-gain1' : '!bg-lose1'} text-bg1`
                  : ''
              }`}
            >
              {option.label}
            </div>
          </>
        );
      })}
    </div>
  );
}
