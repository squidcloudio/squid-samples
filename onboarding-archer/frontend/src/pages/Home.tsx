import LeftPanel from '@/components/LeftPanel.tsx';

export default function Home() {
  return (
    <div className="home_layout flex h-full">
      <div className="w-[384px] h-full">
        <LeftPanel />
      </div>
    </div>
  );
}
