// src/hooks/useWallet.js

import {
  useCurrentAccount,
  useWallets,
  useConnectWallet,
  useDisconnectWallet,
} from '@iota/dapp-kit';

/**
 * Custom hook to manage IOTA wallet connections and account info.
 * Uses official @iota/dapp-kit exports—no unsupported hooks included.
 */
export function useWallet() {
  // 1) Get the currently connected account (or null)
  //    see https://docs.iota.org/ts-sdk/dapp-kit/wallet-hooks/useCurrentAccount :contentReference[oaicite:0]{index=0}
  const account = useCurrentAccount();

  // 2) List all installed IOTA-compatible wallets
  //    see https://docs.iota.org/ts-sdk/dapp-kit :contentReference[oaicite:1]{index=1}
  const wallets = useWallets();

  // 3) Mutation hook to initiate connection when a user selects a wallet
  //    see “useConnectWallet” in the same hooks list :contentReference[oaicite:2]{index=2}
  const { mutate: connectWallet, isLoading: isConnecting } = useConnectWallet();

  // 4) Hook to disconnect the current wallet
  //    see “useDisconnectWallet” documentation :contentReference[oaicite:3]{index=3}
  const disconnect = useDisconnectWallet();

  return {
    account,
    wallets,
    connectWallet,
    disconnect,
    isConnecting,
  };
}
