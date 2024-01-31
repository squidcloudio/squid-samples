import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SquidContextProvider
      options={{
        appId: '[YOUR_APP_ID]',
        region: 'us-east-1.aws',
        environmentId: 'dev',
        squidDeveloperId: '[YOUR_SQUID_DEVELOPER_ID]',
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SquidContextProvider>
  </React.StrictMode>,
);
