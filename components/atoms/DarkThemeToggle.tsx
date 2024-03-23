'use client';

import { useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

// Helpers
import { identifyThemeMode } from '@/helpers/identifyThemeMode';

// Store
import { setThemeMode } from '@/store/themeModeStorage';

type Mode = 'dark' | 'light';

const setModeInDOM = (mode: Mode) => {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  }
  else {
    document.documentElement.classList.remove('dark');
  }
};

function DarkThemeToggle() {
  const [mode, setMode] = useState<Mode>(identifyThemeMode());

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';

    setThemeMode(newMode);
    setModeInDOM(newMode);
    setMode(newMode);
  };

  return (
    <button
      aria-label="Toggle dark mode"
      type="button"
      className="flex justify-center items-center select-none rounded-full h-7 w-7 focus:outline-none focus:shadow-outline hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={toggleMode}
    >
      <HiMoon
        aria-label="Dark mode"
        className="w-5 h-5 text-gray-700 dark:hidden"
        // data-active={mode === 'dark'}
      />
      <HiSun
        aria-label="Light mode"
        className="w-5 h-5 text-gray-300 hidden dark:block"
        // data-active={mode === 'light'}
      />
    </button>
  );
}

export default DarkThemeToggle;
