import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SquidContextProvider } from '@squidcloud/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SquidContextProvider options={
      {
        appId: 'yqlnugbvrw61tf8h8g',
        region: 'us-east-1.aws',
        environmentId: 'dev',
        squidDeveloperId: 'etai'
      }
    }>
      <App />
    </SquidContextProvider>
  </React.StrictMode>,
)
