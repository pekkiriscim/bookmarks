import { useState, createContext, useRef, useEffect } from "react";

import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";
import { LoadingIcon } from "./Icons";

import Explore from "../pages/Explore";
import Bookmarks from "../pages/Bookmarks";
import Favorites from "../pages/Favorites";
import Tag from "../pages/Tag";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import BookmarkModal from "./BookmarkModal";

import { Toaster, toast } from "sonner";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const PageContext = createContext();
export const ModalContext = createContext();
export const AuthStateContext = createContext();

function Dashboard() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [page, setPage] = useState("explore");
  const [modal, setModal] = useState({ activeModal: null, isLoading: false });
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    activeUser: null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({ isLoggedIn: true, activeUser: user });

        setIsAppLoading(false);
      } else {
        setAuthState({ isLoggedIn: false, activeUser: null });

        setIsAppLoading(false);
      }
    });
  }, [authState.isLoggedIn]);

  const modalContainerRef = useRef();

  const handleModal = (e) => {
    if (!modalContainerRef.current.contains(e.target))
      setModal({ ...modal, activeModal: null });
  };

  const modals = {
    signUp: <SignUp />,
    signIn: <SignIn />,
    bookmark: <BookmarkModal />,
  };

  const pages = {
    explore: <Explore />,
    bookmarks: <Bookmarks />,
    favorites: <Favorites />,
  };

  return (
    <AuthStateContext.Provider
      value={{ authState: authState, setAuthState: setAuthState }}
    >
      <PageContext.Provider value={{ page: page, setPage: setPage }}>
        <ModalContext.Provider value={{ modal: modal, setModal: setModal }}>
          {isAppLoading ? (
            <div className="absolute flex h-full w-full items-center justify-center bg-white">
              <LoadingIcon />
            </div>
          ) : (
            <>
              <Toaster />
              {modals[modal.activeModal] && (
                <div
                  onClick={
                    modal.isLoading
                      ? () => {
                          toast(
                            <div className="flex flex-col">
                              <span className="mb-1 text-tsm font-semibold text-gray-900">
                                Hazırlanıyoruz!
                              </span>
                              <span className="text-tsm font-regular text-gray-600">
                                İlhamla dolu bir deneyim yakında seninle olacak!
                              </span>
                            </div>
                          );
                        }
                      : handleModal
                  }
                  className="absolute flex h-full w-full cursor-pointer items-center justify-center bg-gray-700 bg-opacity-70 backdrop-blur"
                >
                  <div className="cursor-auto" ref={modalContainerRef}>
                    {modals[modal.activeModal]}
                  </div>
                </div>
              )}
              <div className="grid h-full w-full grid-cols-[17.5rem_1fr]">
                <Sidebar />
                <div className="overflow-auto px-8 pb-12 pt-8">
                  <PageHeader />
                  {pages[page] ? pages[page] : <Tag tag={page} />}
                </div>
              </div>
            </>
          )}
        </ModalContext.Provider>
      </PageContext.Provider>
    </AuthStateContext.Provider>
  );
}

export default Dashboard;
