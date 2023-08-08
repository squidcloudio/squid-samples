import Intro from '@/components/Intro';
import TickerTape from '@/components/TickerTape';

export default function LeftPanel() {
  return (
    <div className="rounded-2xl h-full bg-bg4 flex flex-col drop-shadow-card">
      <Intro />
      <div className="flex-grow py-6 px-[21px] flex flex-col">
        <TickerTape />
      </div>
    </div>
  );
}
