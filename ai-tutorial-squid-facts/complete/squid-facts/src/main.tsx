import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SquidContextProvider
      options={{
        appId: 'mda554zvl916kyjzzz',
        region: 'us-east-1.aws',
        environmentId: 'dev',
        squidDeveloperId: 'victordev1',
      }}
    >
      <App />
    </SquidContextProvider>
  </React.StrictMode>,
);
