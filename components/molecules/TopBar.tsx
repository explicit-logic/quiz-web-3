'use client';

import { Flowbite } from 'flowbite-react';

import DarkThemeToggle from '@/components/atoms/DarkThemeToggle';

function TopBar() {
  return (
    <div className="inline-flex justify-between py-1 px-3 mb-7 divide-x divide-gray-400 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
      <div className="flex items-center pr-2">
        <span className="flex relative h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
        {/* <span>Ariana Tyler</span> */}
      </div>
      <div className="pl-2">
        <Flowbite theme={{ mode: 'auto' }}>
          <DarkThemeToggle />
        </Flowbite>
      </div>
    </div>
  );
}

export default TopBar;
