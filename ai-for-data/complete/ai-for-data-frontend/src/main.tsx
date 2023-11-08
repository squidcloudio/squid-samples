import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SquidContextProvider
    options={{
      appId: 'im99udtfllbzs4q35b',
      region: 'us-east-1.aws',
      environmentId: 'dev',
      squidDeveloperId: '9cggw9fdl73jtrw56a',
      apiKey: 'a8e9ca28-df5d-4bfd-97cc-9257be335b43',
    }}
  >
    <App />
  </SquidContextProvider>,
);
