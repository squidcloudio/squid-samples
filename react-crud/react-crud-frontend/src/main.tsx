import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SquidContextProvider } from '@squidcloud/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SquidContextProvider
      options={{
        appId: '0cnwdldhiw2fzetsct',
        region: 'us-east-1.aws',
        environmentId: 'dev',
        squidDeveloperId: '9cggw9fdl73jtrw56a',
      }}
    >
      <App />
    </SquidContextProvider>
  </React.StrictMode>,
);
