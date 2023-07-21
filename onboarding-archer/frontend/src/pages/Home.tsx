import LeftPanel from '@/components/LeftPanel.tsx';
import MainPanel from '@/components/MainPanel.tsx';

export default function Home() {
  return (
    <div className="home_layout flex h-[844px] gap-[32px]">
      <div className="w-[384px] h-full">
        <LeftPanel />
      </div>
      <div className="flex-grow">
        <MainPanel />
      </div>
    </div>
  );
}
