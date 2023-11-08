import { useSquid } from '@squidcloud/react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import NavBar from './components/nav-bar';
import { Button } from '@mui/material';
import DisplayInvoices from './components/display-invoices';

function App() {
  const stripeUserId = '[YOUR_STRIPE_USER_ID]';
  const { isAuthenticated, isLoading, getIdTokenClaims, user } = useAuth0();

  const { setAuthIdToken, executeFunction } = useSquid();

  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      setAuthIdToken(undefined, 'auth0');
    } else {
      setAuthIdToken(
        getIdTokenClaims().then((claims) => claims?.__raw),
        'auth0',
      );
      setUserId(user?.sub);
    }
  }, [isAuthenticated, getIdTokenClaims, setAuthIdToken, user]);

  const addData = () => {
    if (isLoading) return <div>Loading...</div>;
    executeFunction('addMockData', stripeUserId);
  };

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      {userId && <DisplayInvoices userId={userId} />}
      <Button onClick={() => addData()} disabled={isLoading}>
        Add Mock Data
      </Button>
    </div>
  );
}

export default App;
