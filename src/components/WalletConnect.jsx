import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import { ConnectButton } from "@iota/dapp-kit";

export default function WalletConnect() {
  const navigate = useNavigate();
  const { wallets, account, disconnect } = useWallet();

  useEffect(() => {
    if (account) {
      navigate("/dashboard", { replace: true });
    }
  }, [account, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-3 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
        Connect Your IOTA Wallet
      </h1>

      {wallets.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No IOTA wallets detected. Please install one to continue.
        </p>
      ) : (
        <ul className="w-full max-w-sm space-y-3 sm:space-y-4">
          {wallets.map((wallet) => (
            <li
              key={wallet.name}
              className="flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="flex items-center space-x-3">
                {wallet.icon && (
                  <img
                    src={wallet.icon}
                    alt={`${wallet.name} icon`}
                    className="w-6 sm:w-8 h-6 sm:h-8"
                  />
                )}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {wallet.name}
                </span>
              </div>
              <ConnectButton />
            </li>
          ))}
        </ul>
      )}

      {account && (
        <div className="mt-4 sm:mt-6 text-center w-full max-w-sm text-gray-800 dark:text-gray-100">
          <p className="break-all">
            Connected:{" "}
            <span className="font-mono text-xs sm:text-sm">
              {account.address}
            </span>
          </p>
          <button
            type="button"
            onClick={disconnect}
            className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
