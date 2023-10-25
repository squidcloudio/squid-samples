import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SquidContextProvider
      options={{
        appId: 'YOUR-APP-ID',
        region: 'us-east-1.aws',
        environmentId: 'prod',
      }}
    >
      <App />
    </SquidContextProvider>
  </React.StrictMode>,
);
