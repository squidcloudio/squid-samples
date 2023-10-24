import SquidFactsAI from './components/squid-facts-ai';
import NavBar from './components/nav-bar';
import './App.css';
import { Snackbar, Alert } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
  // Set state of toast message
  const [open, setOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleToClose = () => {
    setOpen(false);
  };

  // Get Auth0 authentication state

  return (
    <>
      <NavBar isAuthenticated={false} />
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Sepioteuthis_sepioidea_%28Caribbean_Reef_Squid%29.jpg" />
      <SquidFactsAI />
      <Snackbar open={open} onClose={handleToClose} autoHideDuration={6000}>
        <Alert severity="success">{loginMessage}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
