import { useSquid } from '@squidcloud/react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import NavBar from './components/nav-bar';
import { Button } from '@mui/material';
import DisplayInvoices from './components/display-invoices';
import { useCollection } from '@squidcloud/react';
import { UserPayment } from './common/user-payment';
import { Subscription } from 'rxjs';

function App() {
  const stripeUserId = '[YOUR_STRIPE_USER_ID]';
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } =
    useAuth0();
  const userPaymentsCollection = useCollection<UserPayment>('userPayments');
  const { setAuthProvider, executeFunction } = useSquid();

  // const [userId, setUserId] = useState<string | undefined>();
  const [userPayment, setUserPayment] = useState<UserPayment>();

  useEffect(() => {
    setAuthProvider({
      integrationId: 'auth0',
      getToken: async () => {
        if (!user) return undefined;
        return getAccessTokenSilently();
      },
    });
  }, [user, getAccessTokenSilently, setAuthProvider]);

  useEffect(() => {
    let subscription: Subscription | undefined;
    if (user?.sub) {
      subscription = userPaymentsCollection
        .doc(user?.sub)
        .snapshots()
        .subscribe((data) => setUserPayment(data));
    }
    return () => subscription?.unsubscribe();
  }, [user?.sub]);

  const addData = () => {
    if (isLoading) return <div>Loading...</div>;
    executeFunction('addMockData', stripeUserId);
  };

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      <DisplayInvoices userPayment={userPayment} />
      <Button onClick={() => addData()} disabled={isLoading}>
        Add Mock Data
      </Button>
    </div>
  );
}

export default App;
