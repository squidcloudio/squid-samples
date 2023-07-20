import TickerTapeItem from '@/components/TickerTapeItem.tsx';

export default function TickerTape() {
  return (
    <div>
      <div className="text-[20px] leading-[100%] font-extrabold mb-4">
        Ticker Tape Value
      </div>
      <div className="flex flex-col gap-[16px]">
        {[1, 2, 3, 4, 5].map((i) => (
          <TickerTapeItem key={i} />
        ))}
      </div>
    </div>
  );
}
