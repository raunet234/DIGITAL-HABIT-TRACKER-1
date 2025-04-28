// src/components/GuestDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function GuestDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to HabitRise</h1>

      <div className="space-y-4 w-full max-w-xs">
        <Link
          to="/dashboard"
          className="block text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow"
        >
          Continue as Guest
        </Link>

        <Link
          to="/connect"
          className="block text-center py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
        >
          Connect IOTA Wallet
        </Link>
      </div>
    </div>
  );
}
