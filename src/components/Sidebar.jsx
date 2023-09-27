import { useContext, useRef } from "react";

import { allowed_tags } from "../bookmarks.config";

import Alert from "./Alert";
import Avatar from "./Avatar";
import NavButton from "./NavButton";
import AddBookmark from "./AddBookmark";
import Logomark from "./Logomark";
import FeaturedCard from "./FeaturedCard";
import {
  ExploreIcon,
  BookmarksIcon,
  FavoritesIcon,
  SignOutIcon,
  CloseIcon,
  DeleteAccountIcon,
} from "./Icons";

import { toast } from "sonner";

import {
  ModalContext,
  AuthStateContext,
  MobileSidebarContext,
  PageContext,
} from "./Dashboard";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import DarkModeButton from "./DarkModeButton";

const tags = Object.keys(allowed_tags);

function Sidebar({ setDarkMode, darkMode }) {
  const { modal, setModal } = useContext(ModalContext);
  const { authState, setAuthState } = useContext(AuthStateContext);
  const { setPage } = useContext(PageContext);
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } =
    useContext(MobileSidebarContext);

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        setPage("explore");

        setAuthState({ ...authState, isLoggedIn: false });

        setIsMobileSidebarOpen(false);

        toast(
          <Alert
            title={"Hoşça kal!"}
            description={"Bir dahaki sefere görüşmek üzere!"}
          />
        );
      })
      .catch((error) => {
        console.log(error);

        toast(
          <Alert
            title={"Oops!"}
            description={`Çıkış yaparken bir hata oluştu. ${error.message}`}
          />
        );
      });
  };

  const sidebarRef = useRef();

  const handleSidebar = (e) => {
    if (!sidebarRef.current.contains(e.target)) setIsMobileSidebarOpen(false);
  };

  return (
    <div
      onClick={handleSidebar}
      className={`z-10 h-full w-full cursor-pointer overflow-auto bg-gray-700 bg-opacity-70 backdrop-blur max-xl:absolute ${
        isMobileSidebarOpen ? "max-xl:block" : "max-xl:hidden"
      }`}
    >
      <div
        ref={sidebarRef}
        className="flex h-full cursor-auto flex-col justify-between overflow-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 max-xl:w-[17.5rem] max-sm:w-full max-sm:max-w-[17.5rem]"
      >
        <div className="mb-6 grid gap-y-6 pt-8">
          <div className="flex px-6">
            {authState.isLoggedIn && authState.activeUser ? (
              <Avatar
                size={40}
                value={authState.activeUser.displayName}
                radius={8}
              />
            ) : (
              <Logomark size={40} radius={8} />
            )}
            <button
              onClick={() => {
                setIsMobileSidebarOpen(false);
              }}
              className="ml-auto hidden h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-25 max-xl:flex dark:hover:bg-gray-800/30"
            >
              <CloseIcon />
            </button>
          </div>
          {authState.isLoggedIn && authState.activeUser && (
            <div className="grid px-4">
              <AddBookmark
                onClick={() => {
                  setModal({ ...modal, activeModal: "bookmark" });
                }}
              />
            </div>
          )}
          <div className="grid gap-y-1 px-4">
            <NavButton Icon={ExploreIcon} text="Keşfet" route="explore" />
            {tags.map((tag, index) => {
              return <NavButton text={tag} key={index} route={tag} />;
            })}
            <NavButton
              Icon={BookmarksIcon}
              text="Yer İşaretleri"
              route="bookmarks"
              onClick={
                authState.isLoggedIn && authState.activeUser
                  ? null
                  : () => {
                      setModal({ ...modal, activeModal: "signUp" });
                    }
              }
            />
            <NavButton
              Icon={FavoritesIcon}
              text="Favoriler"
              route="favorites"
              onClick={
                authState.isLoggedIn && authState.activeUser
                  ? null
                  : () => {
                      setModal({ ...modal, activeModal: "signUp" });
                    }
              }
            />
          </div>
        </div>
        <div className="grid gap-y-6 px-4 pb-8">
          <FeaturedCard />
          <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
          {authState.isLoggedIn && authState.activeUser && (
            <div className="grid gap-y-1">
              <NavButton
                Icon={DeleteAccountIcon}
                text={"Hesabı Sil"}
                onClick={() => {
                  setModal({ ...modal, activeModal: "deleteAccount" });
                }}
              />
              <NavButton
                Icon={SignOutIcon}
                text={"Çıkış Yap"}
                onClick={handleSignOut}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
