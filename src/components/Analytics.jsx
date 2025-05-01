import React, { useMemo } from "react";
import { useHabits } from "../hooks/useHabits";

// Chart.js & react-chartjs-2 imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const { habits, isLoading } = useHabits();

  const totalHabits = habits.length;
  const totalLogs = habits.reduce((sum, h) => sum + h.logs.length, 0);
  const currentStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);

  const chartData = useMemo(() => ({
    labels: habits.map((h) => h.title),
    datasets: [
      {
        label: "Logs per Habit",
        data: habits.map((h) => h.logs.length),
        backgroundColor: habits.map(() => "rgba(99,102,241,0.7)"), // Indigo-500 with opacity
      },
    ],
  }), [habits]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#6b7280" } }, // text-gray-500
      title: { display: true, text: "Habit Log Counts", color: "#374151" }, // text-gray-700
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Log Count", color: "#4b5563" },
        ticks: { color: "#4b5563" },
      },
      x: {
        title: { display: true, text: "Habit", color: "#4b5563" },
        ticks: { color: "#4b5563" },
      },
    },
  }), []);

  if (isLoading) {
    return (
      <p className="text-center p-4 sm:p-6 text-gray-600 dark:text-gray-300">
        Loading analytics…
      </p>
    );
  }

  return (
    <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 max-w-4xl mx-auto mt-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
        Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Total Habits
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300">
            {totalHabits}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Total Logs
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300">
            {totalLogs}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Current Streak
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300">
            {currentStreak} days
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <section className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
        <Bar data={chartData} options={chartOptions} />
      </section>
    </div>
  );
}
