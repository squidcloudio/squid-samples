import { useAuth0 } from '@auth0/auth0-react';
import { useSquid } from '@squidcloud/react';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IsAuthContainer from './components/IsAuthContainer';

import Login from './pages/Login';

function App() {
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const { setAuthIdToken } = useSquid();

  useEffect(() => {
    const updateAuth = async () => {
      if (isLoading) return;
      if (!isAuthenticated) {
        setAuthIdToken(undefined);
      } else {
        setAuthIdToken(getIdTokenClaims().then((claims) => claims?.__raw));
      }
    };
    updateAuth().then();
  }, [isAuthenticated, isLoading, getIdTokenClaims, setAuthIdToken]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <IsAuthContainer />,
      errorElement: <h1>Error</h1>,
    },
    {
      path: '/:id',
      element: <IsAuthContainer />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
