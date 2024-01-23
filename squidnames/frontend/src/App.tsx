import './App.css';

import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Game from './components/game.tsx';

const App: React.FC = () => {
  const [gameId, setGameId] = useState<string>('');
  const navigate = useNavigate();

  const generateRandomCode = (length: number = 6): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    setGameId(generateRandomCode());
  }, []);

  const handleGameIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameId(event.target.value);
  };

  const handleEnterGame = () => {
    if (gameId) {
      navigate(`/game/${gameId}`); // Navigate to the Game component with the gameId
    } else {
      alert('Please enter a game ID.');
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Squid Names!</h1>
            <h2>A Codenames clone built using <a href="https://squid.cloud">Squid Cloud</a></h2>
            <input
              type="text"
              value={gameId}
              onChange={handleGameIdChange}
              placeholder="Game ID"
              style={{ marginRight: '10px', padding: '10px' }}
            />
            <button onClick={handleEnterGame} style={{ padding: '10px 20px' }}>
              Enter Game
            </button>
          </div>
        }
      />
      <Route path="/game/:gameId" element={<Game />} />
    </Routes>
  );
};

export default App;
