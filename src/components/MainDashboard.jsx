// src/components/MainDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import HabitLogger from "./HabitLogger";
import HabitChallenges from "./HabitChallenges";
import { useRewards } from "../hooks/useRewards";
import { useWallet } from "../hooks/useWallet";

export default function MainDashboard() {
  const { points, isConverting, convertToMiota } = useRewards();
  const { account } = useWallet();

  return (
    <div
      className="
        flex flex-col items-center
        bg-gray-50 text-gray-900
        dark:bg-gray-900 dark:text-gray-100
        min-h-screen p-2 sm:p-4 mt-16
      "
    >
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Your Dashboard
        </h1>
        {account && (
          <div className="
            mt-2 sm:mt-0 text-xs sm:text-sm font-mono break-all
            bg-white/80 text-gray-800 backdrop-blur-sm
            dark:bg-gray-800/80 dark:text-gray-200
            px-3 py-2 rounded-lg shadow-sm
          ">
            Connected: {account.address}
          </div>
        )}
      </header>


      {/* Points + Convert */}
      <section className="
        w-full max-w-4xl
        bg-white text-gray-800
        dark:bg-gray-800 dark:text-gray-200
        p-4 sm:p-6 rounded-lg shadow mb-4 sm:mb-8
        flex flex-col sm:flex-row justify-between items-center
      ">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Points Earned</p>
          <p className="text-3xl sm:text-4xl font-semibold">
            {points}
          </p>
        </div>
        <button
          type="button"
          onClick={convertToMiota}
          disabled={points < 100 || isConverting}
          className="
            mt-4 sm:mt-0
            px-4 sm:px-6 py-2 sm:py-3
            bg-blue-600 hover:bg-blue-700 text-white
            rounded-lg disabled:opacity-50
          "
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
        <HabitLogger />
      </section>

      {/* Navigation Cards */}
      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Link
          to="/analytics"
          className="
            block bg-white text-gray-800
            dark:bg-gray-800 dark:text-gray-200
            p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition text-center
          "
        >
          <h2 className="text-xl sm:text-2xl font-medium mb-2">
            View Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Check your habit streaks and charts
          </p>
        </Link>

        <Link
          to="/rewards"
          className="
            block bg-white text-gray-800
            dark:bg-gray-800 dark:text-gray-200
            p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition text-center
          "
        >
          <h2 className="text-xl sm:text-2xl font-medium mb-2">
            Redeem Rewards
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Spend points on themes, badges, or donations
          </p>
        </Link>
      </section>
    </div>
  );
}
