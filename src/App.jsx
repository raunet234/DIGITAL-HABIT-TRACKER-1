import React from "react";
import { Routes, Route } from "react-router-dom"; // React Router v6 :contentReference[oaicite:0]{index=0}
import { useWalletContext } from "./contexts/WalletContext"; // Custom context hook

import Navigation from "./components/Navigation";
import GuestDashboard from "./components/GuestDashboard";
import WalletConnect from "./components/WalletConnect";
import MainDashboard from "./components/MainDashboard";
import Analytics from "./components/Analytics";
import RewardsStore from "./components/RewardsStore";
import Settings from "./components/Settings";

export default function App() {
  // Access account if you need conditional rendering in App-level (optional)
  const { account: _ } = useWalletContext(); // React Context API :contentReference[oaicite:1]{index=1}

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top navigation bar */}
      <Navigation />
      {/* Main content area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<GuestDashboard />} />
          <Route path="/connect" element={<WalletConnect />} />
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/rewards" element={<RewardsStore />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
