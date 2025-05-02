import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
  className="p-2 rounded border dark:border-white border-black dark:text-white"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
</button>

  );
};

export default ThemeToggle;
