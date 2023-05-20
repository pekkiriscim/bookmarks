import Alert from "../components/Alert";

import { toast } from "sonner";

import { database } from "../firebase";
import { ref, set } from "firebase/database";

export const deleteFromBookmarks = async (
  e,
  setIsDeletingFromBookmarks,
  bookmark,
  authState
) => {
  e.preventDefault();

  setIsDeletingFromBookmarks(true);

  const bookmarksRef = ref(database, `bookmarks/${bookmark.id}`);
  const userBookmarksRef = ref(
    database,
    `users/${authState.activeUser.uid}/bookmarks/${bookmark.id}`
  );

  try {
    await set(bookmarksRef, null);
    await set(userBookmarksRef, null);

    setIsDeletingFromBookmarks(false);

    toast(
      <Alert
        title={"Bir Yer İşareti Kayboldu!"}
        description={
          "Seçtiğin yer işareti büyülü bir şekilde silindi! Artık gözükmüyor."
        }
      />
    );
  } catch (error) {
    setIsDeletingFromBookmarks(false);

    console.log(error);

    toast(
      <Alert
        title={"Oops!"}
        description={`Yer işareti silinirken bir hata oluştu. ${error.message}`}
      />
    );
  }
};
