// src/components/MainDashboard.jsx
import React from "react";
import { Link } from "react-router-dom"; // declarative client-side navigation :contentReference[oaicite:0]{index=0}
import HabitLogger from "./HabitLogger";
import HabitChallenges from "./HabitChallenges";
import { useRewards } from "../hooks/useRewards";
import { useWallet } from "../hooks/useWallet";

export default function MainDashboard() {
  const { points, isConverting, convertToMiota } = useRewards(); // points API from custom hook :contentReference[oaicite:1]{index=1}
  const { account } = useWallet(); // wallet account from IOTA dApp Kit :contentReference[oaicite:2]{index=2}

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-2 sm:p-4 pt-20">
      {" "}
      {/* full-height centered layout :contentReference[oaicite:3]{index=3} */}
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Dashboard</h1>
        {account && (
          <div className="mt-2 sm:mt-0 text-xs sm:text-sm font-mono break-all bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
            Connected: {account.address}
          </div>
        )}
      </header>
      {/* Points + Convert */}
      <section className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <p className="text-gray-600">Points Earned</p>
          <p className="text-3xl sm:text-4xl font-semibold">{points}</p>{" "}
          {/* reactive points display :contentReference[oaicite:5]{index=5} */}
        </div>
        {/* trigger batch conversion */}
        {/* disable until threshold or loading */}
        <button
          type="button"
          onClick={convertToMiota}
          disabled={points < 100 || isConverting}
          className="mt-4 sm:mt-0 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
        >
          Convert to MIOTA
        </button>
      </section>
      {/* Habit Challenges */}
      <section className="w-full max-w-4xl mb-4 sm:mb-8">
        <HabitChallenges />
      </section>
      {/* Habit Logger */}
      <section className="w-full max-w-4xl mb-4 sm:mb-8">
        <HabitLogger />{" "}
        {/* log/delete habits UI :contentReference[oaicite:8]{index=8} */}
      </section>
      {/* Navigation Cards */}
      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Link
          to="/analytics"
          className="block bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          <h2 className="text-xl sm:text-2xl font-medium mb-2">
            View Analytics
          </h2>
          <p className="text-gray-600">Check your habit streaks and charts</p>
        </Link>

        <Link
          to="/rewards"
          className="block bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          <h2 className="text-xl sm:text-2xl font-medium mb-2">
            Redeem Rewards
          </h2>
          <p className="text-gray-600">
            Spend points on themes, badges, or donations
          </p>
        </Link>
      </section>
    </div>
  );
}
