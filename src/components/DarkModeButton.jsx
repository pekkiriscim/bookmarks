import { MoonIcon, SunIcon } from "./Icons";

export default function DarkModeButton({ darkMode, setDarkMode }) {
  const darkModeHandle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <button
      onClick={darkModeHandle}
      className="flex items-center px-3 py-2 gap-3 bg-gray-900 dark:bg-white dark:hover:bg-gray-25 rounded-md"
    >
      <div className="w-6 h-6 flex justify-center items-center">
        {darkMode ? (
          <SunIcon className="text-txl text-white/60 dark:text-gray-500" />
        ) : (
          <MoonIcon className="text-txl text-white/60 dark:text-gray-500" />
        )}
      </div>
      <span className="text-white dark:text-gray-700 dark:font-semibold">
        {darkMode ? "Açık Mod" : "Koyu Mod"}
      </span>
    </button>
  );
}
