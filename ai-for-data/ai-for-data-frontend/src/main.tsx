import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SquidContextProvider
    options={{
      appId: 'SQUID_APP_ID', // Add your app ID
      region: 'us-east-1.aws', // Set your application region here
      environmentId: 'dev',
      squidDeveloperId: 'SQUID_DEVELOPER_ID', // Add your developer ID
    }}
  >
    <App />
  </SquidContextProvider>,
);
