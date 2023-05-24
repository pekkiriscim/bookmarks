import { useContext } from "react";

import { PageContext } from "./Dashboard";

function NavButton({ Icon, text, route, onClick }) {
  const { page, setPage } = useContext(PageContext);

  const handleClick = () => {
    route && setPage(route);
  };

  return (
    <button
      onClick={onClick ? onClick : handleClick}
      className={`flex items-center whitespace-nowrap rounded-md px-3 py-2 text-tmd font-semibold text-gray-700 hover:bg-gray-25 ${
        page === route && "bg-gray-50"
      }`}
    >
      {Icon && <Icon />}
      <span className={Icon ? "ml-3" : "ml-9"}>{text}</span>
    </button>
  );
}

export default NavButton;
