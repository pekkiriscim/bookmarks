import { useContext } from "react";

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
} from "./Icons";

import { ModalContext, AuthStateContext } from "./Dashboard";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const tags = ["react", "node-js", "javascript", "css", "html", "typescript"];

function Sidebar() {
  const { modal, setModal } = useContext(ModalContext);
  const { authState, setAuthState } = useContext(AuthStateContext);

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        setAuthState({ ...authState, isLoggedIn: false });

        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log("An error happened.", error);
      });
  };

  return (
    <div className="flex flex-col justify-between border-r border-gray-200">
      <div className="grid gap-y-6 pt-8">
        <div className=" pl-6">
          {authState.isLoggedIn && authState.activeUser ? (
            <Avatar
              size={2.5}
              value={authState.activeUser.displayName}
              radius={0.5}
            />
          ) : (
            <Logomark size={2.5} radius={0.5} />
          )}
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
          />
          <NavButton Icon={FavoritesIcon} text="Favoriler" route="favorites" />
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
  );
}

export default Sidebar;
