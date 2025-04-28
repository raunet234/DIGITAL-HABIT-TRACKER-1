import React, { createContext, useContext, useState } from "react";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [points, setPoints] = useState(0);

  const addHabit = (title) => {
    const newHabit = {
      id: Date.now(),
      title,
      createdAt: new Date(),
      completed: false,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const logHabit = (habitId) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId ? { ...habit, completed: true } : habit
      )
    );
  };

  const addPoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        points,
        addHabit,
        logHabit,
        addPoints,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
