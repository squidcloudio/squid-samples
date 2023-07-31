import '../styles/globals.scss';
import TopNavBar from './TopNavBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import ConfirmationBar from '@/components/ConfirmationBar.tsx';
import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';

export default function App() {
  const archerContextData = useArcherContext();
  return archerContextData.ready ? (
    <div className="flex flex-col h-full">
      <TopNavBar />
      <ConfirmationBar />
      <div className="container basis-full mt-8 pb-4 lg:mt-12">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  ) : (
    <></>
  );
}
