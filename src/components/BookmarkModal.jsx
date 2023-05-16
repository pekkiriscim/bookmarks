import { useState, useContext } from "react";

import ModalHeader from "./ModalHeader";
import Textarea from "./Textarea";
import InputField from "./InputField";
import ModalButton from "./ModalButton";
import Dropdown from "./Dropdown";

import { toast } from "sonner";

import { ModalContext, AuthStateContext } from "./Dashboard";

import { database } from "../firebase";
import { ref, push, set } from "firebase/database";

const badges = [
  { text: "react", color: "#026AA2", backgroundColor: "#F0F9FF" },
  { text: "css", color: "#027A48", backgroundColor: "#ECFDF3" },
  { text: "javascript", color: "#B54708", backgroundColor: "#FFFAEB" },
];

function BookmarkModal() {
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
    timestamp: Date.now(),
  });

  const handleNewBookmark = async (e) => {
    e.preventDefault();

    setModal({ ...modal, isLoading: true });

    const bookmarksRef = ref(database, "bookmarks");
    const newBookmarkRef = push(bookmarksRef);

    const tagsRef = ref(
      database,
      `tags/${newBookmark.tag}/${newBookmarkRef.key}`
    );
    const userBookmarksRef = ref(
      database,
      `users/${authState.activeUser.uid}/bookmarks/${newBookmarkRef.key}`
    );

    try {
      await set(newBookmarkRef, { ...newBookmark, id: newBookmarkRef.key });
      await set(tagsRef, { ...newBookmark, id: newBookmarkRef.key });
      await set(userBookmarksRef, { ...newBookmark, id: newBookmarkRef.key });

      setModal({ activeModal: null, isLoading: false });

      toast(
        <div className="flex flex-col">
          <span className="mb-1 text-tsm font-semibold text-gray-900">
            Mükemmel!
          </span>
          <span className="text-tsm font-regular text-gray-600">
            Yer işareti başarıyla eklendi.
          </span>
        </div>
      );
    } catch (error) {
      setModal({ ...modal, isLoading: false });

      console.log(error);

      toast(
        <div className="flex flex-col">
          <span className="mb-1 text-tsm font-semibold text-gray-900">
            Oops!
          </span>
          <span className="text-tsm font-regular text-gray-600">
            Yer işareti eklenirken bir hata oluştu. {error.message}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="w-[25rem] rounded-xl bg-white p-6">
      <form
        onSubmit={
          newBookmark.tag === ""
            ? (e) => {
                e.preventDefault();

                toast(
                  <div className="flex flex-col">
                    <span className="mb-1 text-tsm font-semibold text-gray-900">
                      Etiket Seçin
                    </span>
                    <span className="text-tsm font-regular text-gray-600">
                      Yer işaretiniz için etiket seçin.
                    </span>
                  </div>
                );
              }
            : handleNewBookmark
        }
        className="grid gap-y-8"
      >
        <div className="grid gap-y-5">
          <ModalHeader
            title="Yer İşareti Ekleyin"
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
          </div>
        </div>
        <ModalButton text="Yer İşareti Ekle" isLoading={modal.isLoading} />
      </form>
    </div>
  );
}

export default BookmarkModal;
