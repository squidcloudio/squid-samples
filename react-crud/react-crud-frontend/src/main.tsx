import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SquidContextProvider } from '@squidcloud/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SquidContextProvider
      options={{
        appId: '[YOUR_APP_ID]',
        region: '[YOUR_REGION]', // example: us-east-1.aws
        environmentId: 'dev | prod',
        apiKey: '[YOUR_API_KEY]',
        squidDeveloperId: '[YOUR_DEVELOPER_ID]',
      }}
    >
      <App />
    </SquidContextProvider>
  </StrictMode>,
);
