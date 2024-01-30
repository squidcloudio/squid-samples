import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SquidContextProvider } from '@squidcloud/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SquidContextProvider
      options={{
        appId: 'YOUR_SQUID_APP_ID',
        region: 'us-east-1.aws',
        environmentId: 'dev',
        squidDeveloperId: 'YOUR_SQUID_DEVELOPER_ID',
      }}
    >
      <App />
    </SquidContextProvider>
);
