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

// Register only the chart components we need (optimizes bundle size)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { habits, isLoading } = useHabits(); // custom hook for habits

  // Compute summary metrics
  const totalHabits = habits.length;
  const totalLogs = habits.reduce((sum, h) => sum + h.logs.length, 0);
  const currentStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);

  // Prepare chart data and options in useMemo to avoid unnecessary re-renders
  const chartData = useMemo(
    () => ({
      labels: habits.map((h) => h.title),
      datasets: [
        {
          label: "Logs per Habit",
          data: habits.map((h) => h.logs.length),
          backgroundColor: habits.map(() => "rgba(59,130,246,0.6)"), // Tailwind indigo-500 opacity-60
        },
      ],
    }),
    [habits]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Habit Log Counts" },
        tooltip: { enabled: true },
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: "Log Count" } },
        x: { title: { display: true, text: "Habit" } },
      },
    }),
    []
  );

  if (isLoading) {
    return (
      <p className="text-center p-4 sm:p-6 text-gray-600">Loading analytics…</p>
    );
  }

  return (
    <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      {/* Summary Cards */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold">Total Habits</h2>
          <p className="text-xl sm:text-2xl">{totalHabits}</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold">Total Logs</h2>
          <p className="text-xl sm:text-2xl">{totalLogs}</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold">Current Streak</h2>
          <p className="text-xl sm:text-2xl">{currentStreak} days</p>
        </div>
      </div>

      {/* Bar Chart */}
      <section className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <Bar data={chartData} options={chartOptions} />
      </section>
    </div>
  );
}
