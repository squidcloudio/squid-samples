import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SquidContextProvider } from '@squidcloud/react';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="AUTH0_DOMAIN"
    clientId="AUTH0_CLIENT_ID"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: 'squid-backend',
    }}
  >
    <SquidContextProvider
      options={{
        appId: 'YOUR_APP_ID',
        region: 'us-east-1.aws',
        environmentId: 'dev',
        squidDeveloperId: 'YOUR_SQUID_DEVELOPER_ID',
      }}
    >
      <App />
    </SquidContextProvider>
  </Auth0Provider>,
);
