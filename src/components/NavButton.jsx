import { useContext } from "react";

import { PageContext } from "./Dashboard";

function NavButton({ Icon, text }) {
  const { page, setPage } = useContext(PageContext);

  const handleClick = (e) => {
    if (e.target.textContent === "Keşfet") {
      setPage("explore");
    } else if (e.target.textContent === "Yer İşaretleri") {
      setPage("bookmarks");
    } else if (e.target.textContent === "Favoriler") {
      setPage("favorites");
    } else if (e.target.textContent === "Çıkış Yap") {
      return;
    } else {
      setPage(e.target.textContent);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center rounded-md px-3 py-2 text-tmd font-semibold text-gray-700 hover:bg-gray-25 ${
        (text === page ||
          (page === "explore" && text === "Keşfet") ||
          (page === "bookmarks" && text === "Yer İşaretleri") ||
          (page === "favorites" && text === "Favoriler")) &&
        "bg-gray-50"
      }`}
    >
      {Icon && <Icon />}
      <span className={Icon ? "ml-3" : "ml-9"}>{text}</span>
    </button>
  );
}

export default NavButton;
