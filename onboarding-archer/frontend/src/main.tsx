import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/App.tsx';
import { SquidContextProvider } from '@squidcloud/react';
import { ArcherContextProvider } from '@/utils/ArcherContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SquidContextProvider
    options={{
      appId: 'm46jhnqhfzv8ujey2d',
      region: 'us-east-1.aws',
      environmentId: 'dev',
      squidDeveloperId: 'nir2',
    }}
  >
    <ArcherContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ArcherContextProvider>
  </SquidContextProvider>,
);
