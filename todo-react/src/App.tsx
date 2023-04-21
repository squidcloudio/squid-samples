import { useAuth0 } from '@auth0/auth0-react';
import { useSquid } from '@squidcloud/react';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import MainContainer from './pages/MainContainer';

function App() {
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const { setAuthIdToken } = useSquid();

  useEffect(() => {
    const updateAuth = async () => {
      if (isLoading) return;
      if (!isAuthenticated) {
        setAuthIdToken(undefined);
      } else {
        setAuthIdToken(await getIdTokenClaims().then((claims) => claims?.__raw));
      }
    };
    updateAuth().then();
  }, [isAuthenticated, isLoading, getIdTokenClaims, setAuthIdToken]);

  useEffect(() => {
    const fetchIdToken = async () => {
      const claims = await getIdTokenClaims();
      if (claims) {
        setAuthIdToken(claims.__raw);
      }
    };
    fetchIdToken();
  }, [getIdTokenClaims, setAuthIdToken]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainContainer />,
      errorElement: <h1>Error</h1>,
    },
    {
      path: '/:id',
      element: <MainContainer />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
