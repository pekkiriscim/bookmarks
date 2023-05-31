import { useContext } from "react";

import Alert from "./Alert";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";

import { motion } from "framer-motion";

import { toast } from "sonner";

import { ModalContext, AuthStateContext, PageContext } from "./Dashboard";

import { auth, database } from "../firebase";
import { get, ref, set } from "firebase/database";
import { deleteUser } from "firebase/auth";

function DeleteAccount({ forwardRef }) {
  const { modal, setModal } = useContext(ModalContext);
  const { authState, setAuthState } = useContext(AuthStateContext);
  const { setPage } = useContext(PageContext);

  const handleDeleteAccount = async (e) => {
    try {
      e.preventDefault();

      setModal({ ...modal, isLoading: true });

      const userBookmarksRef = ref(
        database,
        `users/${authState.activeUser.uid}/bookmarks`
      );
      const usersRef = ref(database, `users/${authState.activeUser.uid}`);

      const snapshot = await get(userBookmarksRef);
      if (snapshot.exists()) {
        const userBookmarks = Object.keys(snapshot.val());

        userBookmarks.map(async (bookmark) => {
          const bookmarksRef = ref(database, `bookmarks/${bookmark}`);

          await set(bookmarksRef, null);
        });
      } else {
        console.log("Veri yok.");
      }

      await set(usersRef, null);
      await deleteUser(auth.currentUser);

      setPage("explore");
      setModal({ activeModal: null, isLoading: false });
      setAuthState({ isLoggedIn: false, activeUser: null });

      toast(
        <Alert
          title={"Hoşça Kal!"}
          description={
            "Unutma, yeni bir hesapla geri dönmek her zaman mümkün. Kendine iyi bak!"
          }
        />
      );
    } catch (error) {
      setModal({ ...modal, isLoading: false });

      if (error.code === "auth/requires-recent-login") {
        toast(
          <Alert
            title={"Son Bir Adım!"}
            description={
              "Hesabınızı silmek için güncel bir giriş yapmanız gerekiyor. Lütfen tekrar giriş yapın ve hesap silme sürecinizi başarıyla tamamlayın."
            }
          />
        );
      } else {
        toast(
          <Alert
            title={"Oops!"}
            description={`Hesabınız silinirken bir hata oluştu. ${error.message}`}
          />
        );
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full max-h-[17.5rem] max-w-[25rem] cursor-auto overflow-auto rounded-xl bg-white dark:bg-gray-900 p-6 max-sm:w-full max-sm:max-w-full"
      ref={forwardRef}
    >
      <form onSubmit={handleDeleteAccount} className="grid gap-y-8">
        <div className="grid gap-y-5">
          <ModalHeader
            title="Hesabınızı silin"
            description="Bu işlem sonucunda paylaştığınız yer işaretleri ve favorilere eklediğiniz yer işaretleri kalıcı olarak silinecektir."
          />
        </div>
        <ModalButton
          text="Hesabı Sil"
          isLoading={modal.isLoading}
          danger={true}
        />
      </form>
    </motion.div>
  );
}

export default DeleteAccount;
