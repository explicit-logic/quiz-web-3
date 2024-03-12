import { HiMoon, HiSun } from 'react-icons/hi';
import { useIsMounted } from 'flowbite-react/lib/esm/hooks/use-is-mounted';
import { useThemeMode } from 'flowbite-react/lib/esm/hooks/use-theme-mode';

function DarkThemeToggle() {
  const isMounted = useIsMounted();
  const { computedMode, toggleMode } = useThemeMode();

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
        data-active={isMounted && computedMode === 'dark'}
      />
      <HiSun
        aria-label="Light mode"
        className="w-4 h-4 text-gray-300 hidden dark:block"
        data-active={isMounted && computedMode === 'light'}
      />
    </button>
  );
}

export default DarkThemeToggle;
