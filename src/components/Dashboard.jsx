import { useState, createContext } from "react";

import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";

import Explore from "../pages/Explore";
import Bookmarks from "../pages/Bookmarks";
import Favorites from "../pages/Favorites";
import Tag from "../pages/Tag";

export const PageContext = createContext();

const pages = {
  explore: <Explore />,
  bookmarks: <Bookmarks />,
  favorites: <Favorites />,
};

function Dashboard() {
  const [page, setPage] = useState("explore");

  return (
    <PageContext.Provider value={{ page: page, setPage: setPage }}>
      <div className="grid h-full w-full grid-cols-[17.5rem_1fr]">
        <Sidebar />
        <div>
          <PageHeader />
          {pages[page] ? pages[page] : <Tag tag={page} />}
        </div>
      </div>
    </PageContext.Provider>
  );
}

export default Dashboard;
