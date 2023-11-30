import { useCollection, useSquid } from '@squidcloud/react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import NavBar from './components/nav-bar';
import { Button } from '@mui/material';
import DisplayInvoices from './components/display-invoices';
import { UserPayment } from './common/user-payment';

function App() {
  const stripeUserId = '[YOUR_STRIPE_CUSTOMER_ID]';
  const { isAuthenticated, isLoading, getIdTokenClaims, user } = useAuth0();
  const [userPayment, setUserPayment] = useState<UserPayment>();
  const { setAuthIdToken, executeFunction } = useSquid();
  const userPaymentsCollection = useCollection<UserPayment>('userPayments');

  useEffect(() => {
    const updateAuth = async () => {
      if (isLoading) return;
      if (!isAuthenticated) {
        setAuthIdToken(undefined, 'auth0');
      } else {
        setAuthIdToken(
          getIdTokenClaims().then((claims) => claims?.__raw),
          'auth0',
        );
        const user_id = user!.sub!;

        userPaymentsCollection
          .doc(user_id)
          .snapshots()
          .subscribe((doc) => {
            console.log(doc);
            setUserPayment(doc);
          });
      }
    };
    updateAuth().then();
  }, [isAuthenticated, getIdTokenClaims, setAuthIdToken, user]);

  const addData = () => {
    executeFunction('addMockData', stripeUserId);
  };

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      {userPayment && <DisplayInvoices userPayment={userPayment} />}
      <Button onClick={() => addData()}>Add Mock Data</Button>
    </div>
  );
}

export default App;
