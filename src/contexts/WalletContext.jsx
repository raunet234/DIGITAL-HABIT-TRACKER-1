// src/contexts/WalletContext.jsx
import React, { createContext, useContext } from 'react';
import { useWallet } from '../hooks/useWallet';

// 1. Create context without a default value to catch missing provider usage
const WalletContext = createContext(undefined);

export function WalletProvider({ children }) {
  // 2. Retrieve wallet API from your hook
  const { account, wallets, connectWallet, disconnect, isConnecting } = useWallet();

  // 3. Provide the hook value via context
  return (
    <WalletContext.Provider
      value={{ account, wallets, connectWallet, disconnect, isConnecting }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  // 4. Consume context and guard against missing provider
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
}
