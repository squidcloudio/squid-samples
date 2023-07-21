import LeftPanel from '@/components/LeftPanel.tsx';

export default function Home() {
  return (
    <div className="home_layout flex h-[844px]">
      <div className="w-[384px] h-full">
        <LeftPanel />
      </div>
    </div>
  );
}
