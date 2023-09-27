import { useContext } from "react";

import HeaderButton from "./HeaderButton";

import { MenuIcon } from "./Icons";

import {
  PageContext,
  ModalContext,
  AuthStateContext,
  MobileSidebarContext,
} from "./Dashboard";

function PageHeader() {
  const { page } = useContext(PageContext);
  const { modal, setModal } = useContext(ModalContext);
  const { authState } = useContext(AuthStateContext);
  const { setIsMobileSidebarOpen } = useContext(MobileSidebarContext);

  const pageTranslations = {
    explore: "Keşfet",
    bookmarks: "Yer İşaretleri",
    favorites: "Favoriler",
  };

  return (
    <div className="mb-8 flex items-center justify-between max-sm:flex-col-reverse">
      <div className="flex items-center max-sm:w-full max-sm:justify-start">
        <button
          onClick={() => {
            setIsMobileSidebarOpen(true);
          }}
          className="mr-3 hidden h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-25 dark:hover:bg-gray-800/30 max-xl:flex"
        >
          <MenuIcon />
        </button>
        <span className="select-none text-dsm font-semibold text-gray-900 dark:text-gray-100">
          {pageTranslations[page] ? pageTranslations[page] : `#${page}`}
        </span>
      </div>
      {!(authState.isLoggedIn && authState.activeUser) && (
        <div className="grid grid-cols-2 gap-x-3 max-sm:mb-6 max-sm:w-full">
          <HeaderButton
            text={"Giriş Yap"}
            isPrimary={false}
            onClick={() => {
              setModal({ ...modal, activeModal: "signIn" });
            }}
          />
          <HeaderButton
            text={"Kaydol"}
            isPrimary={true}
            onClick={() => {
              setModal({ ...modal, activeModal: "signUp" });
            }}
          />
        </div>
      )}
    </div>
  );
}

export default PageHeader;
