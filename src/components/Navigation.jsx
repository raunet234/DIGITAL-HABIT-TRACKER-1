// src/components/Navigation.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import { useGetBalance } from "../hooks/useGetBalance";
import { ConnectButton } from "@iota/dapp-kit";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { account } = useWallet();

  const { balance } = useGetBalance();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrolled
           ? "bg-white dark:bg-gray-900 shadow-md"
           : "bg-gray-50 dark:bg-gray-900"

      }`
    }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              HabitRise
            </span>
            <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:animate-pulse"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/connect" label="Connect" />
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/analytics" label="Analytics" />
            <NavLink to="/rewards" label="Rewards" />
            <NavLink to="/settings" label="Settings" />
            {!account && <ConnectButton />}
            {account && (
              <button
                className="relative text-sm font-medium group"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600">
                  <span>User</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="absolute right-0 hidden pt-2 group-hover:block">
                  <div className="w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                        {account.address}
                      </button>
                      <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                        Balance: {balance || "0"}
                      </button>
                      <button className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100">
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md">
          <MobileNavLink to="/" label="Home" />
          <MobileNavLink to="/connect" label="Connect" />
          <MobileNavLink to="/dashboard" label="Dashboard" />
          <MobileNavLink to="/analytics" label="Analytics" />
          <MobileNavLink to="/rewards" label="Rewards" />
          <MobileNavLink to="/settings" label="Settings" />
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink component for desktop
function NavLink({ to, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
        ${
          isActive
            ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
        }
      `}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-300"></span>
      )}
    </Link>
  );
}

// Reusable NavLink component for mobile
function MobileNavLink({ to, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
        ${
          isActive
            ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-300"
        }
      `}
    >
      {label}
    </Link>
  );
}

export default Navigation;
