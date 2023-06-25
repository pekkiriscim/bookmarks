import { useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  const darkModeHandle = () => {
    setTimeout(() => {
      setDarkMode(!darkMode);
      localStorage.setItem("darkMode", !darkMode);
    }, 150);
  };
  const [selected, setSelected] = useState(true);

  const handleToggle = () => {
    setSelected(!selected);
    darkModeHandle();
  };

  return (
    <div>
      <div className="relative mt-4 h-10 w-full rounded-2xl  bg-gray-200 p-1 dark:bg-gray-800">
        <div className="relative z-50 flex h-full w-full items-center">
          <div
            onClick={handleToggle}
            className="flex w-full cursor-pointer justify-center "
          >
            <button>
              <SunIcon className="text-lg font-bold text-black dark:text-gray-300" />
            </button>
          </div>
          <div
            onClick={handleToggle}
            className="flex w-full cursor-pointer justify-center"
          >
            <button>
              <MoonIcon className="text-lg font-bold text-black dark:text-gray-300" />
            </button>
          </div>
        </div>

        <span
          className={`text-sm absolute top-[4px] flex h-[1.88rem] w-1/2 items-center justify-center rounded-2xl bg-white opacity-60 shadow transition-all duration-200 ease-in dark:bg-black ${
            selected
              ? "text-indigo-600 left-1 font-semibold"
              : "left-1/2 -ml-1 text-gray-800"
          }`}
        ></span>
      </div>
    </div>
  );
}
