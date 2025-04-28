// src/components/RewardsStore.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';                              // programmatic routing :contentReference[oaicite:0]{index=0}
import { useRewards } from '../hooks/useRewards';                             // points & conversion logic 

// Static list of reward options
const REWARDS = [
  { id: 'theme',   title: 'Premium Dark Theme', cost: 50, description: 'Unlock a sleek dark UI theme.' },
  { id: 'badge',   title: 'Digital Badge',      cost: 75, description: 'Mint an on-chain badge for your profile.' },
  { id: 'charity', title: 'Charity Donation',   cost: 20, description: 'Donate points to a charity of your choice.' },
];

export default function RewardsStore() {
  const navigate = useNavigate();
  const { points, redeemPoints, convertToMiota, isConverting } = useRewards();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  // Auto-clear feedback after 3 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleRedeem = (cost) => {
    const ok = redeemPoints(cost);
    setMessageType(ok ? 'success' : 'error');                               // set alert type based on result :contentReference[oaicite:1]{index=1}
    setMessage(
      ok
        ? `✅ Successfully redeemed ${cost} points!`
        : `❌ Not enough points; need ${cost}.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Rewards Store</h1>
          <button
            type="button"
            onClick={() => navigate(-1)}                                     // navigate back in history :contentReference[oaicite:2]{index=2}
            className="text-blue-500 hover:underline"
          >
            ← Back
          </button>
        </header>

        {/* Current Points */}
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Your Points:</p>
          <p className="text-2xl font-semibold">{points}</p>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div
            role="alert"                                                    // ARIA alert for screen readers :contentReference[oaicite:3]{index=3}
            className={`p-3 rounded ${
              messageType === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        {/* List of Rewards */}
        <ul className="space-y-4">
          {REWARDS.map(({ id, title, cost, description }) => (
            <li
              key={id}
              className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1">
                <h2 className="text-xl font-medium">{title}</h2>
                <p className="text-gray-600 mb-1">{description}</p>
                <p className="text-sm text-gray-500">Cost: {cost} pts</p>
              </div>
              <button
                type="button"
                onClick={() => handleRedeem(cost)}
                disabled={points < cost}                                      // disable until enough points :contentReference[oaicite:4]{index=4}
                className="mt-4 sm:mt-0 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-disabled={points < cost}                                // better accessibility than disabled alone :contentReference[oaicite:5]{index=5}
              >
                Redeem
              </button>
            </li>
          ))}
        </ul>

        {/* Batch Conversion */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-3">
            Convert 100 points to 10 MIOTA on the IOTA Tangle:
          </p>
          <button
            type="button"
            onClick={convertToMiota}
            disabled={points < 100 || isConverting}                         // disable logic with loading state :contentReference[oaicite:6]{index=6}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-disabled={points < 100 || isConverting}
          >
            {isConverting ? 'Converting…' : 'Convert to MIOTA'}
          </button>
        </section>
      </div>
    </div>
  );
}
