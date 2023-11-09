import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SquidContextProvider
    options={{
      appId: '[YOUR_APP_ID]',
      region: '[YOUR_REGION]',
      environmentId: 'dev',
      squidDeveloperId: '[YOUR_SQUID_DEVELOPER_ID]',
    }}
  >
    <App />
  </SquidContextProvider>,
);
