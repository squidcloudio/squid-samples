import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain="AUTH0_DOMAIN"
    clientId="AUTH0_CLIENT_ID"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: 'squid-ai',
    }}
  >
    <SquidContextProvider
      options={{
      appId: 'YOU_SQUID_APP_ID',
      region: 'us-east-1.aws', // replace with your region
      environmentId: 'dev',
      squidDeveloperId: 'YOUR_SQUID_DEVELOPER_ID',
      }}
    >
      <App />
    </SquidContextProvider>
  </Auth0Provider>,
);
