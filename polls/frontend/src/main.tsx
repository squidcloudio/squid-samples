import * as ReactDOM from 'react-dom/client';
import AdminView from '@/components/AdminView';
import { SquidContextProvider } from '@squidcloud/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserView from '@/components/UserView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserView />,
  },
  {
    path: '/admin',
    element: <AdminView />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-802zi5gr1ncya425.us.auth0.com"
    clientId="yCawdpBWKSoFkmapn0BxP2VpllIQBpxw"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <SquidContextProvider
      options={{
        appId: import.meta.env.VITE_APP_ID,
        region: import.meta.env.VITE_REGION,
        environmentId: import.meta.env.VITE_ENVIRONMENT_ID,
        squidDeveloperId: import.meta.env.VITE_SQUID_DEVELOPER_ID,
      }}
    >
      <RouterProvider router={router} />
    </SquidContextProvider>
  </Auth0Provider>,
);
