// src/components/HabitLogger.jsx
import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";

export default function HabitLogger() {
  const { habits, isLoading, addHabit, removeHabit, logHabit } = useHabits();
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addHabit(trimmed);
    setTitle("");
  };

  if (isLoading) {
    return (
      <div className="p-2 sm:p-4 max-w-md mx-auto">
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading habits…
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3 sm:mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New habit name"
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          className="px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded transition-colors duration-200"
        >
          Add
        </button>
      </form>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No habits yet. Add one above!
        </p>
      ) : (
        <ul className="space-y-2 sm:space-y-3">
          {habits.map(({ id, title, logs }) => (
            <li
              key={id}
              className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded transition-colors duration-200"
            >
              <div>
                <p className="font-medium dark:text-gray-100">{title}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Logged {logs.length} time{logs.length !== 1 && "s"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => logHabit(id)}
                  className="px-2 py-1 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded transition-colors duration-200"
                >
                  Log
                </button>
                <button
                  type="button"
                  onClick={() => removeHabit(id)}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
