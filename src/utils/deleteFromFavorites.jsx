import Alert from "../components/Alert";

import { toast } from "sonner";

import { database } from "../firebase";
import { ref, set } from "firebase/database";

export const deleteFromFavorites = async (
  e,
  setIsUpdatingFavorites,
  authState,
  bookmark
) => {
  e.preventDefault();

  setIsUpdatingFavorites(true);

  const userFavoritesRef = ref(
    database,
    `users/${authState.activeUser.uid}/favorites/${bookmark.id}`
  );
  const bookmarkLikesRef = ref(
    database,
    `bookmarks/${bookmark.id}/likes/${authState.activeUser.uid}`
  );
  const userBookmarksRef = ref(
    database,
    `users/${authState.activeUser.uid}/bookmarks/${bookmark.id}/likes/${authState.activeUser.uid}`
  );

  try {
    await set(userFavoritesRef, null);
    await set(bookmarkLikesRef, false);

    if (bookmark.userId === authState.activeUser.uid) {
      await set(userBookmarksRef, false);
    }

    setIsUpdatingFavorites(false);

    toast(
      <Alert
        title={"Hop diye düştü!"}
        description={"Yer işareti favorilerden çıkarıldı."}
      />
    );
  } catch (error) {
    setIsUpdatingFavorites(false);

    console.log(error);

    toast(
      <Alert
        title={"Oops!"}
        description={`Yer işareti favorilerden çıkarılırken bir hata oluştu. ${error.message}`}
      />
    );
  }
};
