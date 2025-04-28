// src/components/Navigation.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">HabitRise</div>
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex md:space-x-4 text-white mt-4 md:mt-0`}
      >
        <li>
          <Link to="/">Guest Dashboard</Link>
        </li>
        <li>
          <Link to="/connect">Connect Wallet</Link>
        </li>
        <li>
          <Link to="/dashboard">Main Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/rewards">Rewards Store</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
