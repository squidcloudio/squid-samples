import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SquidContextProvider } from '@squidcloud/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SquidContextProvider
      options={{
        appId: 'YOUR_APP_ID',
        region: 'YOUR_REGION', // example: 'us-east-1.aws'
        environmentId: 'dev | prod', // choose one of 'dev' or 'prod'
        squidDeveloperId: 'YOUR_SQUID_DEVELOPER_ID',
      }}
    >
      <App />
    </SquidContextProvider>
  </React.StrictMode>,
);
