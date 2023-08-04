import '../styles/globals.scss';
import TopNavBar from './TopNavBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import ConfirmationBar from '@/components/ConfirmationBar.tsx';
import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';
import MainModal from '@/components/MainModal.tsx';
import { useEffect } from 'react';

export default function App() {
  const archerContextData = useArcherContext();
  useEffect(() => {
    const archerModalSeen = localStorage.getItem('archerModalSeen') === 'true';
    if (!archerModalSeen) {
      archerContextData.setMainModalOpen(true);
      localStorage.setItem('archerModalSeen', 'true');
    }
  });

  return archerContextData.ready ? (
    <>
      <MainModal />
      <div className="flex flex-col h-full">
        <TopNavBar />
        <ConfirmationBar />
        <div className="container basis-full mt-8 pb-4 lg:mt-12">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
