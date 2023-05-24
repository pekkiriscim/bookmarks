import { useContext } from "react";

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

const tags = Object.keys(allowed_tags);

function Sidebar() {
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

  return (
    <div
      className={`z-10 h-full w-full overflow-auto bg-gray-700 bg-opacity-70 backdrop-blur max-xl:absolute ${
        isMobileSidebarOpen ? "max-xl:block" : "max-xl:hidden"
      }`}
    >
      <div className="flex h-full flex-col justify-between overflow-auto border-r border-gray-200 bg-white max-xl:w-[17.5rem] max-sm:w-full max-sm:max-w-[17.5rem]">
        <div className="mb-6 grid gap-y-6 pt-8">
          <div className="flex px-6">
            {authState.isLoggedIn && authState.activeUser ? (
              <Avatar
                size={2.5}
                value={authState.activeUser.displayName}
                radius={0.5}
              />
            ) : (
              <Logomark size={2.5} radius={0.5} />
            )}
            <button
              onClick={() => {
                setIsMobileSidebarOpen(false);
              }}
              className="ml-auto hidden h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-25 max-xl:flex"
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
          {authState.isLoggedIn && authState.activeUser && (
            <NavButton
              Icon={SignOutIcon}
              text={"Çıkış Yap"}
              onClick={handleSignOut}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
