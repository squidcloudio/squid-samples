import ChartAndData from '@/components/ChartAndData.tsx';

export default function MainPanel() {
  return (
    <div>
      <div className="text-[16px] text-text1 mb-6 font-extrabold">
        Portfolio Performance
      </div>
      <div>
        <ChartAndData />
      </div>
    </div>
  );
}
