// src/components/Settings.jsx
import React, { useState, useEffect } from "react";
import { useWallet } from "../hooks/useWallet"; // fetches account & disconnect :contentReference[oaicite:1]{index=1}
import { useRewards } from "../hooks/useRewards"; // fetches points

export default function Settings() {
  const { account, disconnect } = useWallet(); // no balance hook in dApp Kit :contentReference[oaicite:2]{index=2}
  const { points } = useRewards(); // points state from custom hook

  // Auto-donation toggle, persisted in localStorage via useState initializer :contentReference[oaicite:3]{index=3}
  const [autoDonate, setAutoDonate] = useState(() => {
    return localStorage.getItem("autoDonate") === "true";
  });

  // Sync autoDonate to localStorage whenever it changes :contentReference[oaicite:4]{index=4}
  useEffect(() => {
    localStorage.setItem("autoDonate", String(autoDonate));
  }, [autoDonate]);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Settings</h1>

      {/* Wallet Management Section */}
      <section className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Wallet Management
        </h2>
        {account ? (
          <div className="space-y-2">
            <p>
              <span className="font-medium">Address:</span>{" "}
              <span className="font-mono text-xs sm:text-sm">
                {account.address}
              </span>
            </p>
            <button
              type="button"
              onClick={disconnect}
              className="mt-2 px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <p className="text-gray-600">No wallet connected.</p>
        )}
      </section>

      {/* Points Display Section */}
      <section className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Your Points</h2>
        <p className="text-xl sm:text-2xl font-semibold">{points}</p>
      </section>

      {/* Auto-Donation Toggle Section */}
      <section className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Auto-Donate</h2>
        <label className="flex items-center space-x-2">
          {/* Tailwind's checkbox class */}
          <input
            type="checkbox"
            checked={autoDonate}
            onChange={() => setAutoDonate(!autoDonate)}
            className="form-checkbox h-4 sm:h-5 w-4 sm:w-5 text-green-600"
          />
          <span className="text-sm sm:text-base">
            Automatically donate 10% of MIOTA payouts
          </span>
        </label>
      </section>
    </div>
  );
}
