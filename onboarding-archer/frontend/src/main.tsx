import * as ReactDOM from 'react-dom/client';
import App from '@/components/App';
import { SquidContextProvider } from '@squidcloud/react';
import { ArcherContextProvider } from '@/utils/ArcherContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SquidContextProvider
    options={{
      appId: import.meta.env.VITE_APP_ID,
      region: import.meta.env.VITE_REGION,
      environmentId: import.meta.env.VITE_ENVIRONMENT_ID,
      squidDeveloperId: import.meta.env.VITE_SQUID_DEVELOPER_ID,
    }}
  >
    <ArcherContextProvider>
      <App />
    </ArcherContextProvider>
  </SquidContextProvider>,
);
