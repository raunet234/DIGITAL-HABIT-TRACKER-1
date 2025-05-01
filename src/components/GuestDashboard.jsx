// src/components/GuestDashboard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Client‐side routing :contentReference[oaicite:0]{index=0}

export default function GuestDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
  {/* Hero Section */}
  <div className="relative overflow-hidden">
    {/* Animated background shapes */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
          Build Better Habits with{" "}
          <span className="text-indigo-600 dark:text-indigo-400">HabitRise</span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up">
          Track your habits, earn rewards, and transform your life one day at a time.
        </p>
        <div className="mt-10 flex justify-center gap-4 animate-fade-in-up">
          <Link
            to="/connect"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* Features Section */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {/* Feature → Analytics */}
      <Link
        to="/analytics"
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
      >
        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Track Your Progress
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Monitor your habits with beautiful analytics and progress tracking.
        </p>
      </Link>

      {/* Feature → Rewards */}
      <Link
        to="/rewards"
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
      >
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-2xl">🏆</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Earn Rewards
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Get points for your achievements and redeem them for exciting rewards.
        </p>
      </Link>

      {/* Feature → Settings */}
      <Link
        to="/settings"
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
      >
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-2xl">⚙️</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          App Settings
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your wallet, auto-donation, and personal preferences.
        </p>
      </Link>

    </div>
  </div>

  {/* CTA Section */}
  <div className="bg-indigo-600">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        <span className="block">Ready to transform your habits?</span>
        <span className="block text-indigo-200">
          Start your journey today.
        </span>
      </h2>
      <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div className="inline-flex rounded-md shadow">
          <Link
            to="/connect"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
  )}