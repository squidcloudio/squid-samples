import { useAuth0 } from '@auth0/auth0-react';
import { useSquid } from '@squidcloud/react';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import MainContainer from './pages/MainContainer';

function App() {
  const [avatar, setAvatar] = useState<string | undefined>('');
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const { setAuthIdToken } = useSquid();

  useEffect(() => {
    const updateAuth = async () => {
      if (!isAuthenticated) {
        setAuthIdToken(undefined);
      } else {
        const claims = await getIdTokenClaims();
        setAuthIdToken(claims?.__raw);
        setAvatar(claims?.picture);
      }
    };
    updateAuth();
  }, [isAuthenticated, getIdTokenClaims, setAuthIdToken]);

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
