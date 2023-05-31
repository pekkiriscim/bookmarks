import { useState, createContext, useRef, useEffect } from "react";

import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";
import Alert from "./Alert";

import { LoadingIcon } from "./Icons";

import { motion, AnimatePresence } from "framer-motion";

import Explore from "../pages/Explore";
import Bookmarks from "../pages/Bookmarks";
import Favorites from "../pages/Favorites";
import Tag from "../pages/Tag";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import BookmarkModal from "./BookmarkModal";
import DeleteAccount from "./DeleteAccount";

import { Toaster, toast } from "sonner";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const PageContext = createContext();
export const ModalContext = createContext();
export const AuthStateContext = createContext();
export const MobileSidebarContext = createContext();

function Dashboard() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [page, setPage] = useState("explore");
  const [modal, setModal] = useState({ activeModal: null, isLoading: false });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    activeUser: null,
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

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
    signUp: <SignUp forwardRef={modalContainerRef} />,
    signIn: <SignIn forwardRef={modalContainerRef} />,
    bookmark: <BookmarkModal forwardRef={modalContainerRef} />,
    deleteAccount: <DeleteAccount forwardRef={modalContainerRef} />,
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
            <div className="absolute flex h-full w-full items-center justify-center bg-white dark:bg-gray-900">
              <LoadingIcon />
            </div>
          ) : (
            <>
              <Toaster />
              <AnimatePresence>
                {modals[modal.activeModal] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={
                      modal.isLoading
                        ? () => {
                            toast(
                              <Alert
                                title={"Hazırlanıyoruz!"}
                                description={
                                  "İlhamla dolu bir deneyim yakında seninle olacak!"
                                }
                              />
                            );
                          }
                        : handleModal
                    }
                    className="absolute z-20 flex h-full w-full cursor-pointer items-center justify-center overflow-auto bg-gray-700 bg-opacity-70 dark:bg-opacity-10 dark:bg-gray-800 backdrop-blur max-sm:flex-col max-sm:justify-end max-sm:p-4"
                  >
                    {modals[modal.activeModal]}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grid h-full w-full grid-cols-[17.5rem_1fr] max-xl:grid-cols-1">
                <MobileSidebarContext.Provider
                  value={{
                    isMobileSidebarOpen: isMobileSidebarOpen,
                    setIsMobileSidebarOpen: setIsMobileSidebarOpen,
                  }}
                >
                  <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
                  <div className="h-full overflow-auto scroll-smooth bg-white dark:bg-gray-900 px-8 pb-12 pt-8 max-xl:px-4 max-xl:pt-4">
                    <PageHeader />
                    {pages[page] ? pages[page] : <Tag tag={page} />}
                  </div>
                </MobileSidebarContext.Provider>
              </div>
            </>
          )}
        </ModalContext.Provider>
      </PageContext.Provider>
    </AuthStateContext.Provider>
  );
}

export default Dashboard;
