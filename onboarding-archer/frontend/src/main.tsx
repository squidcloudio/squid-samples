import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/App.tsx';
import { SquidContextProvider } from '@squidcloud/react';
import { ArcherContextProvider } from '@/utils/ArcherContextProvider.tsx';

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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ArcherContextProvider>
  </SquidContextProvider>,
);
