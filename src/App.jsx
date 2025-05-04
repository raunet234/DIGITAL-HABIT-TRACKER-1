import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useWalletContext } from "./contexts/WalletContext"; // Custom context hook
import { HabitProvider } from "./context/HabitContext";

import Navigation from "./components/Navigation";
import GuestDashboard from "./components/GuestDashboard";
import WalletConnect from "./components/WalletConnect";
import MainDashboard from "./components/MainDashboard";
import Analytics from "./components/Analytics";
import RewardsStore from "./components/RewardsStore";
import Settings from "./components/Settings";
import HabitLogger from "./components/HabitLogger";

// Transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

export default function App() {
  const { account: _ } = useWalletContext();
  const location = useLocation();

  return (
    <HabitProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
        <Navigation />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div {...pageVariants}>
                    <GuestDashboard />
                  </motion.div>
                }
              />
              <Route
                path="/connect"
                element={
                  <motion.div {...pageVariants}>
                    <WalletConnect />
                  </motion.div>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <motion.div {...pageVariants}>
                    <MainDashboard />
                  </motion.div>
                }
              />
              <Route
                path="/analytics"
                element={
                  <motion.div {...pageVariants}>
                    <Analytics />
                  </motion.div>
                }
              />
              <Route
                path="/rewards"
                element={
                  <motion.div {...pageVariants}>
                    <RewardsStore />
                  </motion.div>
                }
              />
              <Route
                path="/settings"
                element={
                  <motion.div {...pageVariants}>
                    <Settings />
                  </motion.div>
                }
              />
              <Route
                path="/habits"
                element={
                  <motion.div {...pageVariants}>
                    <HabitLogger />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </HabitProvider>
  );
}
