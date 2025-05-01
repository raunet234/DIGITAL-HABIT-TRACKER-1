// src/components/Settings.jsx
import React, { useState, useEffect } from "react";
import { useWallet } from "../hooks/useWallet";
import { useRewards } from "../hooks/useRewards";
import ThemeToggle from "./ThemeToggle";

export default function Settings() {
  const { account, disconnect } = useWallet();
  const { points } = useRewards();

  const [autoDonate, setAutoDonate] = useState(() => {
    return localStorage.getItem("autoDonate") === "true";
  });

  useEffect(() => {
    localStorage.setItem("autoDonate", String(autoDonate));
  }, [autoDonate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-3 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-gray-100">
        Settings
      </h1>

      {/* Night Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <ThemeToggle />
      </div>

      {/* Wallet Management Section */}
      <section className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-gray-200">
          Wallet Management
        </h2>
        {account ? (
          <div className="space-y-2">
            <p>
              <span className="font-medium dark:text-gray-300">Address:</span>{" "}
              <span className="font-mono text-xs sm:text-sm dark:text-gray-100">
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
          <p className="text-gray-600 dark:text-gray-400">
            No wallet connected.
          </p>
        )}
      </section>

      {/* Points Display Section */}
      <section className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-gray-200">
          Your Points
        </h2>
        <p className="text-xl sm:text-2xl font-semibold dark:text-gray-100">
          {points}
        </p>
      </section>

      {/* Auto-Donation Toggle Section */}
      <section className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-gray-200">
          Auto-Donate
        </h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={autoDonate}
            onChange={() => setAutoDonate(!autoDonate)}
            className="form-checkbox h-4 sm:h-5 w-4 sm:w-5 text-green-600"
          />
          <span className="text-sm sm:text-base dark:text-gray-300">
            Automatically donate 10% of MIOTA payouts
          </span>
        </label>
      </section>
    </div>
  );
}
