import Intro from '@/components/Intro.tsx';
import TickerTape from '@/components/TickerTape.tsx';

export default function LeftPanel() {
  return (
    <div className="rounded-2xl overflow-hidden h-full bg-bg4 flex flex-col">
      <Intro />
      <div className="flex-grow py-6 px-[21px] flex flex-col">
        <TickerTape />
      </div>
    </div>
  );
}
