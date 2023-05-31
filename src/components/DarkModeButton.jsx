import { MoonIcon, SunIcon } from "./Icons";

export default function DarkModeButton({ darkMode, setDarkMode }) {
  const darkModeHandle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <button
      onClick={darkModeHandle}
      className="flex items-center px-3 py-2 gap-3 hover:bg-gray-25"
    >
      <div className="w-6 h-6 flex justify-center items-center">
        {darkMode ? (
          <SunIcon className="text-txl text-gray-500" />
        ) : (
          <MoonIcon className="text-txl text-gray-500" />
        )}
      </div>
      <span className="text-gray-700 font-semibold">
        {darkMode ? "Açık Mod" : "Koyu Mod"}
      </span>
    </button>
  );
}
