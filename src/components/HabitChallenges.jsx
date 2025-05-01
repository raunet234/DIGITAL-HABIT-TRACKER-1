// src/components/HabitChallenges.jsx
import React, { useState } from "react";

const CHALLENGES = [
  {
    id: "100-days-code",
    title: "100 Days of Code",
    description: "Code for at least 1 hour every day for 100 days",
    duration: 100,
    points: 1000,
    category: "hard",
    icon: "💻",
  },
  {
    id: "30-days-fitness",
    title: "30 Days Fitness Challenge",
    description: "Complete a daily workout for 30 days",
    duration: 30,
    points: 500,
    category: "hard",
    icon: "💪",
  },
  {
    id: "90-days-savings",
    title: "90 Days Savings Challenge",
    description: "Save a fixed amount daily for 90 days",
    duration: 90,
    points: 800,
    category: "finance",
    icon: "💰",
  },
  {
    id: "meditation-streak",
    title: "Meditation Streak",
    description: "Meditate for 10 minutes daily",
    duration: 60,
    points: 600,
    category: "hard",
    icon: "🧘",
  },
];

export default function HabitChallenges() {
  const [selectedChallenges, setSelectedChallenges] = useState([]);

  const handleStartChallenge = (challenge) => {
    setSelectedChallenges((prev) => [...prev, { ...challenge, progress: 0 }]);
  };

  const handleDailySubmit = (challengeId) => {
    const updated = selectedChallenges.map((c) =>
      c.id === challengeId ? { ...c, progress: c.progress + 1 } : c
    );
    setSelectedChallenges(updated);
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl fo nt-bold mb-4 dark:text-gray-100">
        Special Challenges
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Complete these challenges for bonus points!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CHALLENGES.map((challenge) => {
          const sel = selectedChallenges.find((c) => c.id === challenge.id);
          const progress = sel ? sel.progress : 0;
          const completed = progress >= challenge.duration;
          const remaining = challenge.duration - progress;

          return (
            <div
              key={challenge.id}
              className={`border rounded-lg p-4 transition-colors duration-200
                ${
                  completed
                    ? "border-green-500 bg-green-50 dark:bg-green-900/50"
                    : "border-gray-200 dark:border-gray-700 dark:bg-gray-700/50"
                }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 dark:text-gray-100">
                    <span>{challenge.icon}</span>
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {challenge.description}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="text-indigo-600 dark:text-indigo-300">
                      Reward: {challenge.points} points
                    </span>
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                  {challenge.duration} days
                </span>
              </div>

              {sel && (
                <>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                      <span>
                        Progress: {progress}/{challenge.duration} days
                      </span>
                      <span>{remaining} days remaining</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                        style={{
                          width: `${(progress / challenge.duration) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleDailySubmit(challenge.id)}
                    disabled={completed}
                    className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors duration-200"
                  >
                    {completed
                      ? "Challenge Completed!"
                      : "Submit Daily Progress"}
                  </button>
                </>
              )}

              {!sel && (
                <div className="mt-4">
                  <button
                    onClick={() => handleStartChallenge(challenge)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Start Challenge
                  </button>
                </div>
              )}

              {completed && (
                <div className="text-green-600 dark:text-green-300 font-semibold text-center mt-2">
                  Challenge Completed! 🎉
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
