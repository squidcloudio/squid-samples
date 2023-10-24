import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain="AUTH0-DOMAIN"
    clientId="AUTH0-CLIENT-ID"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
    <SquidContextProvider
      options={{
        appId: 'YOUR-APP-ID',
        region: 'us-east-1.aws',
        environmentId: 'dev',
        squidDeveloperId: 'YOUR-DEVELOPER-ID',
      }}
    >
      <App />
    </SquidContextProvider>
  </Auth0Provider>,
);
