import React from "react";
import { ConnectButton, useCurrentAccount } from "@iota/dapp-kit";
import { Routes, Route } from "react-router-dom";
import GuestDashboard from "./components/GuestDashboard";
import MainDashboard from "./components/MainDashboard";
import Analytics from "./components/Analytics";
import RewardsStore from "./components/RewardsStore";
import Settings from "./components/Settings";
import WalletConnect from "./components/WalletConnect";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<GuestDashboard />} />
        <Route path="/connect" element={<WalletConnect />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/rewards" element={<RewardsStore />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <header className="App-header">
        <ConnectButton />
      </header>
      <ConnectedAccount />
    </div>
  );
}
function ConnectedAccount() {
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }

  return <div>Connected to {account.address}</div>;
}

export default App;
