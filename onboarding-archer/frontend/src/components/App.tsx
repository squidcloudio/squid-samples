import '../styles/globals.scss';
import TopNavBar from './TopNavBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.tsx';

export default function App() {
  return (
    <div className="flex flex-col h-full">
      <TopNavBar></TopNavBar>
      <div className="container basis-full mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
