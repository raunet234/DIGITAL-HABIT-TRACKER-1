// src/components/RewardsStore.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // programmatic routing :contentReference[oaicite:0]{index=0}
import { useRewards } from "../hooks/useRewards"; // points & conversion logic

// Static list of reward options
const REWARDS = [
  {
    id: "discord",
    title: "Join Discord Community",
    cost: 100,
    description: "Join our Discord community and get 100 points!",
    type: "social",
    icon: "💬",
  },
  {
    id: "x-community",
    title: "Join X Community",
    cost: 50,
    description: "Follow us on X and get 50 points!",
    type: "social",
    icon: "🐦",
  },
  {
    id: "daily-login",
    title: "Daily Login Bonus",
    cost: 50,
    description: "Claim your daily login bonus of 50 points!",
    type: "daily",
    icon: "🎁",
  },
  {
    id: "theme",
    title: "Premium Dark Theme",
    cost: 50,
    description: "Unlock a sleek dark UI theme.",
    type: "premium",
    icon: "🎨",
  },
  {
    id: "badge",
    title: "Digital Badge",
    cost: 75,
    description: "Mint an on-chain badge for your profile.",
    type: "premium",
    icon: "🏅",
  },
  {
    id: "charity",
    title: "Charity Donation",
    cost: 20,
    description: "Donate points to a charity of your choice.",
    type: "charity",
    icon: "❤️",
  },
];

export default function RewardsStore() {
  const navigate = useNavigate();
  const { points, redeemPoints, convertToMiota, isConverting } = useRewards();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [claimedDaily, setClaimedDaily] = useState(() => {
    const lastClaimed = localStorage.getItem("lastDailyClaim");
    return lastClaimed
      ? new Date(lastClaimed).toDateString() === new Date().toDateString()
      : false;
  });

  // Auto-clear feedback after 3 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleRedeem = (reward) => {
    if (reward.id === "daily-login" && claimedDaily) {
      setMessageType("error");
      setMessage("❌ You've already claimed your daily bonus today!");
      return;
    }

    const ok = redeemPoints(reward.cost);
    if (ok) {
      if (reward.id === "daily-login") {
        localStorage.setItem("lastDailyClaim", new Date().toISOString());
        setClaimedDaily(true);
      }
      setMessageType("success");
      setMessage(`✅ Successfully redeemed ${reward.cost} points!`);
    } else {
      setMessageType("error");
      setMessage(`❌ Not enough points; need ${reward.cost}.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Rewards Store</h1>
          <button
            type="button"
            onClick={() => navigate(-1)} // navigate back in history :contentReference[oaicite:2]{index=2}
            className="text-blue-500 hover:underline"
          >
            ← Back
          </button>
        </header>

        {/* Current Points */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <p className="text-gray-600">Your Points:</p>
          <p className="text-xl sm:text-2xl font-semibold">{points}</p>
        </div>

        {/* Feedback Alert */}
        {message && (
          <div
            role="alert" // ARIA alert for screen readers :contentReference[oaicite:3]{index=3}
            className={`p-2 sm:p-3 rounded ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* List of Rewards */}
        <ul className="space-y-3 sm:space-y-4">
          {REWARDS.map((reward) => (
            <li
              key={reward.id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-medium flex items-center gap-2">
                  <span>{reward.icon}</span>
                  {reward.title}
                </h2>
                <p className="text-gray-600 mb-1">{reward.description}</p>
                <p className="text-sm text-gray-500">Cost: {reward.cost} pts</p>
              </div>
              <button
                type="button"
                onClick={() => handleRedeem(reward)}
                disabled={
                  points < reward.cost ||
                  (reward.id === "daily-login" && claimedDaily)
                }
                className="mt-3 sm:mt-0 px-4 sm:px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-disabled={
                  points < reward.cost ||
                  (reward.id === "daily-login" && claimedDaily)
                }
              >
                {reward.id === "daily-login" && claimedDaily
                  ? "Claimed Today"
                  : "Redeem"}
              </button>
            </li>
          ))}
        </ul>

        {/* Batch Conversion */}
        <section className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-3">
            Convert 100 points to 10 MIOTA on the IOTA Tangle:
          </p>
          <button
            type="button"
            onClick={convertToMiota}
            disabled={points < 100 || isConverting} // disable logic with loading state :contentReference[oaicite:6]{index=6}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-disabled={points < 100 || isConverting}
          >
            {isConverting ? "Converting…" : "Convert to MIOTA"}
          </button>
        </section>
      </div>
    </div>
  );
}
