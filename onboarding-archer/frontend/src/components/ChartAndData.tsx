import Chart from '@/components/Chart.tsx';
import GainLoseIndicator from '@/components/GainLoseIndicator.tsx';
import TimeSelector from '@/components/TimeSelector.tsx';

export default function ChartAndData() {
  return (
    <div className="w-full mb-[48px]">
      <div className="flex justify-between items-center border-b border-line1 pb-[12px] mb-[12px]">
        <div className="flex items-center">
          <div className="text-[32px] font-extrabold leading-[100%] mr-[12px]">
            $95,923.40
          </div>
          <GainLoseIndicator percentChange={12.32} />
        </div>
        <TimeSelector />
      </div>
      <Chart />
    </div>
  );
}
