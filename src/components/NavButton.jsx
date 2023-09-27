import { useContext } from "react";

import { PageContext, MobileSidebarContext } from "./Dashboard";

function NavButton({ Icon, text, route, onClick }) {
  const { page, setPage } = useContext(PageContext);
  const { setIsMobileSidebarOpen } = useContext(MobileSidebarContext);

  const handleClick = () => {
    route && setPage(route);

    setIsMobileSidebarOpen(false);
  };

  return (
    <button
      onClick={onClick ? onClick : handleClick}
      className={`flex select-none items-center whitespace-nowrap rounded-md px-3 py-2 text-tmd font-semibold dark:font-medium text-gray-700 dark:text-white/90 dark:hover:dark:bg-gray-800/30 hover:bg-gray-25 ${
        page === route && "bg-gray-50 dark:bg-gray-800/30"
      }`}
    >
      {Icon && <Icon />}
      <span className={Icon ? "ml-3" : "ml-9"}>{text}</span>
    </button>
  );
}

export default NavButton;
