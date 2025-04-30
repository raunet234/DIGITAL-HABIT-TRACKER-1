
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@iota/dapp-kit/dist/index.css';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IotaClientProvider, WalletProvider as DappWalletProvider } from '@iota/dapp-kit';
import { getFullnodeUrl } from '@iota/iota-sdk/client';

import { WalletProvider } from './contexts/WalletContext';

const queryClient = new QueryClient();

const networks = {
  devnet:  { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. React Query provider for caching & mutations */}
    <QueryClientProvider client={queryClient}>
      
      {/* 2. dApp-Kit provider supplies IOTA client/network config */}
      <IotaClientProvider networks={networks} defaultNetwork="devnet">
        
        {/* 3. dApp-Kit wallet provider manages wallet connections */}
        <DappWalletProvider>
          
          {/* 4. Your custom context exposes useWallet hook throughout the tree */}
          <WalletProvider>
            
            {/* 5. BrowserRouter for SPA routing */}
            <BrowserRouter>
              <App />
            </BrowserRouter>
          
          </WalletProvider>
        </DappWalletProvider>

      </IotaClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
