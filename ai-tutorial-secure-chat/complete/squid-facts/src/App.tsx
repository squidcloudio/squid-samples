import SquidFactsAI from './components/squid-facts-ai';
import './App.css';
import NavBar from './components/nav-bar';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSquid } from '@squidcloud/react';
import { Snackbar, Alert } from '@mui/material';

function App() {
  // Set state of toast message
  const [toastOpen, setToastOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  // Get Auth0 authentication state
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const { setAuthIdToken } = useSquid();

  useEffect(() => {
    const updateAuth = async () => {
      if (isLoading) return;

      if (!isAuthenticated) {
        // Inform Squid backend of logout
        setAuthIdToken(undefined, 'auth0');

        setLoginMessage('You are logged out!');
        setToastOpen(true);
      } else {
        // Send Squid Auth ID Token to Squid backend
        setAuthIdToken(
          getIdTokenClaims().then((claims) => claims?.__raw),
          'auth0',
        );

        setLoginMessage('You are logged in!');
        setToastOpen(true);
      }
    };
    updateAuth().then();
  }, [isAuthenticated, isLoading, getIdTokenClaims, setAuthIdToken]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const handleToClose = () => {
    setToastOpen(false);
  };

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Sepioteuthis_sepioidea_%28Caribbean_Reef_Squid%29.jpg" />
      <SquidFactsAI />
      <Snackbar open={toastOpen} onClose={handleToClose} autoHideDuration={6000}>
        <Alert severity="success">{loginMessage}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
