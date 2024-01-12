import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';
import { SupportedSquidRegion } from '@squidcloud/client/dist/common/src';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SquidContextProvider
      options={{
        appId: 'avc5r0qswveqy9a6lv',
        region: 'local' as SupportedSquidRegion,
        environmentId: 'dev',
        squidDeveloperId: 'victordev1',
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SquidContextProvider>
  </React.StrictMode>,
);
