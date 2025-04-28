// src/components/HabitLogger.jsx

import React, { useState } from 'react';
import { useHabits } from '../hooks/useHabits';

export default function HabitLogger() {
  const { habits, isLoading, addHabit, removeHabit, logHabit } = useHabits();
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addHabit(trimmed);
    setTitle('');
  };

  if (isLoading) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <p className="text-center text-gray-600">Loading habits…</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New habit name"
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Add
        </button>
      </form>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500">No habits yet. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {habits.map(({ id, title, logs }) => (
            <li
              key={id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded"
            >
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">
                  Logged {logs.length} time{logs.length !== 1 && 's'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => logHabit(id)}
                  className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                  Log
                </button>
                <button
                  type="button"
                  onClick={() => removeHabit(id)}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
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
