import { useAuth0 } from '@auth0/auth0-react';
import { useSquid } from '@squidcloud/react';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import MainContainer from './pages/MainContainer';
import Root from './pages/Root';

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
      element: <Root avatar={avatar} />,
      errorElement: <h1>Page Not found</h1>,
      children: [
        { index: true, element: <MainContainer /> },
        { path: '/:id', element: <MainContainer /> },
        { path: 'login', element: <Login /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
