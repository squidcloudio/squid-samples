import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SquidContextProvider } from '@squidcloud/react';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure({
  Auth: {
    region: awsExports.region,
    userPoolId: awsExports.userPoolId,
    userPoolWebClientId: awsExports.userPoolWebClientId,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AmplifyProvider>
    <SquidContextProvider
      options={{
        appId: '4hsnksoki9mtb3hmt9',
        region: 'us-east-1.aws',
        environmentId: 'dev',
        squidDeveloperId: '9cggw9fdl73jtrw56a',
      }}
    >
      <App />
    </SquidContextProvider>
  </AmplifyProvider>,
);
