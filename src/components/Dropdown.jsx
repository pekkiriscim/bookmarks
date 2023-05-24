import { useState } from "react";

import { SearchIcon, TickIcon } from "./Icons";

function Dropdown({ text, label, hint, badges, newBookmark, setNewBookmark }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid gap-y-1.5">
      <label
        className="text-tsm font-medium text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </label>
      <div className="relative flex flex-col">
        <button
          type="button"
          className="dropdown-button relative flex h-11 w-full items-center rounded-lg border border-gray-300 px-3.5 py-2.5 outline-none focus:border-primary-300 focus:ring-4 focus:ring-primary-100"
          onClick={(e) => {
            e.preventDefault();

            setIsOpen(!isOpen);
          }}
        >
          <SearchIcon />
          <span className="ml-2 flex text-tmd font-regular text-gray-500">
            {newBookmark.tag === "" ? (
              text
            ) : (
              <span className="mr-1.5 flex h-6 items-center justify-center rounded-md border border-gray-300 px-[0.5625rem] py-0.5 text-tsm font-medium text-gray-700 last:mr-0">
                {newBookmark.tag}
              </span>
            )}
          </span>
        </button>
        {isOpen && (
          <div className="absolute top-12 grid max-h-80 w-full grid-cols-1 gap-y-1 overflow-auto rounded-lg border border-gray-200 bg-white p-1.5">
            {badges.map((element, index) => {
              return (
                <button
                  key={index}
                  className={`flex cursor-pointer items-center justify-between rounded-md py-2.5 pl-2 pr-2.5 text-tmd font-medium text-gray-900 hover:bg-gray-25 ${
                    element === newBookmark.tag && "bg-gray-50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();

                    const badgeText = e.target.textContent;
                    setNewBookmark({ ...newBookmark, tag: badgeText });

                    setIsOpen(!isOpen);
                  }}
                >
                  <span>{element}</span>
                  {element === newBookmark.tag && <span>{<TickIcon />}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {hint && (
        <span className="text-tsm font-regular text-gray-600">{hint}</span>
      )}
    </div>
  );
}

export default Dropdown;
