'use client';

import { useState } from 'react';

import { HiMoon, HiSun } from 'react-icons/hi';

const isClient = typeof window !== 'undefined';

type Mode = 'dark' | 'light';

const setModeInLS = (mode: Mode) => localStorage.setItem('theme-mode', mode);

const setModeInDOM = (mode: Mode) => {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  }
  else {
    document.documentElement.classList.remove('dark');
  }
};

const getInitialMode = (): Mode => {
  if (!isClient) return 'dark';
  const mode = (localStorage.getItem('theme-mode') ?? 'auto') as Mode | 'auto';

  if (mode === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return mode;
};

function DarkThemeToggle() {
  const [mode, setMode] = useState<Mode>(getInitialMode());

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';

    setModeInLS(newMode);
    setModeInDOM(newMode);
    setMode(newMode);
  };

  return (
    <button
      aria-label="Toggle dark mode"
      type="button"
      className="flex justify-center items-center select-none rounded-full h-5 w-5 focus:outline-none focus:shadow-outline hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={toggleMode}
    >
      <HiMoon
        aria-label="Dark mode"
        className="w-4 h-4 text-gray-700 dark:hidden"
        // data-active={mode === 'dark'}
      />
      <HiSun
        aria-label="Light mode"
        className="w-4 h-4 text-gray-300 hidden dark:block"
        // data-active={mode === 'light'}
      />
    </button>
  );
}

export default DarkThemeToggle;
