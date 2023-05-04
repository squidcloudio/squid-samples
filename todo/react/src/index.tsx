import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { SquidContextProvider } from '@squidcloud/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Auth0Provider
    domain="dev-04umd56tv7v5qeyv.us.auth0.com"
    clientId="NVTDdwX2iikH7HpcGzqqDXpzndmshbLd"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <SquidContextProvider
      options={{
        appId: 'mnhwpkfn8e8e0ozo23',
        region: 'us-east-1.aws',
      }}
    >
      <App />
    </SquidContextProvider>
  </Auth0Provider>,
);
