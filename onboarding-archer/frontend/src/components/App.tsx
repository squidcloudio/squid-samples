import '../styles/globals.scss';
import TopNavBar from './TopNavBar';
import ConfirmationBar from '@/components/ConfirmationBar';
import { useArcherContext } from '@/utils/ArcherContextProvider';
import MainModal from '@/components/MainModal';
import { useEffect } from 'react';
import LeftPanel from '@/components/LeftPanel';
import MainPanel from '@/components/MainPanel';
import NextStepsModal from '@/components/NextStepsModal';
import DocModal from '@/components/DocModal';

export default function App() {
  const { setMainModalOpen, ready, inspectModeEnabled } = useArcherContext();
  useEffect(() => {
    const archerModalSeen = localStorage.getItem('archerModalSeen') === 'true';
    if (!archerModalSeen) {
      setMainModalOpen(true);
      localStorage.setItem('archerModalSeen', 'true');
    }
  }, []);

  return ready ? (
    <div className={inspectModeEnabled ? 'inspection_mode' : ''}>
      <MainModal />
      <NextStepsModal />
      <DocModal />
      <div className="flex flex-col h-full">
        <TopNavBar />
        <ConfirmationBar />
        <div className="container basis-full mt-8 pb-4 lg:mt-12">
          <div className="home_layout flex h-[882px] gap-[32px]">
            <div className="w-[384px] h-full relative z-10">
              <LeftPanel />
            </div>
            <div className="flex-grow w-max-[800px]">
              <MainPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
