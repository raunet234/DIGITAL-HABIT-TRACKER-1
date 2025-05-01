// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@iota/dapp-kit/dist/index.css";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  IotaClientProvider,
  WalletProvider as DappWalletProvider,
} from "@iota/dapp-kit";
import { getFullnodeUrl } from "@iota/iota-sdk/client";
import { WalletProvider } from './contexts/WalletContext';
import { ThemeProvider } from './contexts/ThemeContext';



const queryClient = new QueryClient();

const networks = {
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <IotaClientProvider networks={networks} defaultNetwork="devnet">
          <DappWalletProvider>
            <WalletProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </WalletProvider>
          </DappWalletProvider>
        </IotaClientProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>

);
