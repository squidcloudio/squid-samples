import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SquidContextProvider
    options={{
      appId: 'YOUR_APP_ID', // Add your app ID
      region: 'YOUR_REGION', // Likely us-east-1.aws
      environmentId: 'dev',
      developerId: 'YOUR_SQUID_DEVELOPER_ID', // Add your developer ID
    }}
  >
    <App />
  </SquidContextProvider>,
);
