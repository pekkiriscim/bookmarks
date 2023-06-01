import { useState, useContext } from "react";

import { allowed_tags } from "../bookmarks.config";

import ModalHeader from "./ModalHeader";
import Textarea from "./Textarea";
import InputField from "./InputField";
import CheckboxField from "./CheckboxField";
import ModalButton from "./ModalButton";
import Dropdown from "./Dropdown";
import Alert from "./Alert";

import { motion } from "framer-motion";

import { toast } from "sonner";

import { ModalContext, AuthStateContext } from "./Dashboard";

import { database } from "../firebase";
import { ref, push, set } from "firebase/database";

const badges = Object.keys(allowed_tags);

function BookmarkModal({ forwardRef }) {
  const { modal, setModal } = useContext(ModalContext);
  const { authState } = useContext(AuthStateContext);

  const [newBookmark, setNewBookmark] = useState({
    title: "",
    description: "",
    url: "",
    tag: "",
    userDisplayName: authState.activeUser.displayName,
    userId: authState.activeUser.uid,
    id: "",
    private: false,
    timestamp: Date.now(),
  });

  const handleNewBookmark = async (e) => {
    e.preventDefault();

    setModal({ ...modal, isLoading: true });

    const bookmarksRef = push(ref(database, "bookmarks"));

    const userBookmarksRef = ref(
      database,
      `users/${authState.activeUser.uid}/bookmarks/${bookmarksRef.key}`
    );

    try {
      await set(bookmarksRef, { ...newBookmark, id: bookmarksRef.key });
      await set(userBookmarksRef, { ...newBookmark, id: bookmarksRef.key });

      setModal({ activeModal: null, isLoading: false });

      toast(
        <Alert
          title={"Mükemmel!"}
          description={"Yer işareti başarıyla eklendi."}
        />
      );
    } catch (error) {
      setModal({ ...modal, isLoading: false });

      console.log(error);

      toast(
        <Alert
          title={"Oops!"}
          description={`Yer işareti eklenirken bir hata oluştu. ${error.message}`}
        />
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full max-h-[46rem] max-w-[25rem] cursor-auto overflow-auto rounded-xl bg-white p-6 max-sm:w-full max-sm:max-w-full"
      ref={forwardRef}
    >
      <form
        onSubmit={
          newBookmark.tag === ""
            ? (e) => {
              e.preventDefault();

              toast(
                <Alert
                  title={"Etiket Seçin"}
                  description={"Yer işaretiniz için etiket seçin."}
                />
              );
            }
            : handleNewBookmark
        }
        className="grid gap-y-8"
      >
        <div className="grid gap-y-5">
          <ModalHeader
            title="Yer işareti ekleyin"
            description="Yeni bir yer işareti ekleyin ve diğerleriyle paylaşın."
          />
          <div className="grid gap-y-4">
            <Textarea
              inputID={"bookmark-title"}
              label={"Başlık"}
              placeholder={"Başlık giriniz"}
              min={10}
              max={150}
              onChange={(e) => {
                setNewBookmark({ ...newBookmark, title: e.target.value });
              }}
              rows={2}
            />

            <Textarea
              inputID={"bookmark-description"}
              label={"Açıklama"}
              placeholder={"Açıklama giriniz"}
              min={10}
              max={300}
              onChange={(e) => {
                setNewBookmark({ ...newBookmark, description: e.target.value });
              }}
              rows={3}
            />

            <InputField
              inputID="bookmark-url"
              label="URL"
              type="url"
              placeholder="URL giriniz"
              hint={"Örn: https://www.example.com şeklinde bir URL girin."}
              onChange={(e) => {
                setNewBookmark({ ...newBookmark, url: e.target.value });
              }}
            />

            <Dropdown
              text={"Etiket seçiniz"}
              label={"Etiket"}
              hint={"Yer işaretiniz için etiket seçin."}
              badges={badges}
              newBookmark={newBookmark}
              setNewBookmark={setNewBookmark}
            />

            <CheckboxField
              inputID="bookmark-private"
              label="Özel Yer İşareti"
              checked={false}
              hint="Yer işaretinizi sadece siz görebilirsiniz."
              onChange={(e) => {
                setNewBookmark({ ...newBookmark, private: e });
              }}
            />
          </div>
        </div>
        <ModalButton text="Yer İşareti Ekle" isLoading={modal.isLoading} />
      </form>
    </motion.div>
  );
}

export default BookmarkModal;
