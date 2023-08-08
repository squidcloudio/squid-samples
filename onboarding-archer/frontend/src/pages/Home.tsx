import LeftPanel from '@/components/LeftPanel';
import MainPanel from '@/components/MainPanel';

export default function Home() {
  return (
    <div className="home_layout flex h-[882px] gap-[32px]">
      <div className="w-[384px] h-full relative z-10">
        <LeftPanel />
      </div>
      <div className="flex-grow w-max-[800px]">
        <MainPanel />
      </div>
    </div>
  );
}
