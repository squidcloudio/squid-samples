import { SquidContextProvider } from '@squidcloud/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SquidContextProvider
    options={{
      appId: 'YOUR_APP_ID',
      region: 'us-east-1.aws',
      environmentId: 'prod',
    }}
  >
    <App />
  </SquidContextProvider>,
);
