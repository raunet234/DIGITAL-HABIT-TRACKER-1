// src/components/Settings.jsx
import React, { useState, useEffect } from "react";

import ThemeToggle from "./ThemeToggle";

import { useWallet } from "../hooks/useWallet"; // fetches account & disconnect :contentReference[oaicite:1]{index=1}
import { useRewards } from "../hooks/useRewards"; // fetches points
import {
  useDisconnectWallet,
  useAccounts,
  useCurrentWallet,
} from "@iota/dapp-kit";
// import { useGetBalance } from "../hooks/useGetBalance";
import { getFullnodeUrl, IotaClient } from "@iota/iota-sdk/client";

export default function Settings() {
  const { mutate: disconnect } = useDisconnectWallet();
  const accounts = useAccounts();
  const { account } = useWallet(); // no balance hook in dApp Kit :contentReference[oaicite:2]{index=2}
  const { points } = useRewards(); // points state from custom hook
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const [balance, setBalance] = useState(0);
  console.log(accounts);
  console.log(currentWallet);

  useEffect(() => {
    const getBalance = async () => {
      const iotaClient = new IotaClient({ url: getFullnodeUrl("testnet") });
      if (!account.address) return;
      const balance = await iotaClient.getBalance({
        owner: account.address,
      });
      // setBalance(balance);
      console.log(
        "Balance in Nano (1_000_000_000 Nano = 1 IOTA): ",
        balance.totalBalance / 1_000_000_000
      );
      setBalance(balance.totalBalance / 1_000_000_000);
    };
    getBalance();
  }, [connectionStatus]);

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

      <section className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">

        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Wallet Management
        </h2>

        <div className=" ">
          {connectionStatus === "connected" ? (
            <div>
              <p>{balance} IOTA</p>
              <h2>Current wallet:</h2>
              <div>Name: {currentWallet.name}</div>
            </div>
          ) : (
            <div>Connection status: {connectionStatus}</div>
          )}
        </div>
        {account ? (
          <div className="space-y-2">
            {/* testing */}
            <div style={{ padding: 20 }}>
              <h2>Available Chain:</h2>
              {accounts.length === 0 && <div>No accounts detected</div>}
              <ul>
                {accounts.map((account) => (
                  <li className="text-xs text-green-500" key={account.address}>
                    {account.chains}
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <span className="font-medium">Address:</span>{" "}
              <span className="font-mono text-xs sm:text-sm">
  {account?.address || "N/A"}
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
