import Alert from "../components/Alert";

import { toast } from "sonner";

import { database } from "../firebase";
import { ref, set } from "firebase/database";

export const addToFavorites = async (
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
  const userBookmarksRef = ref(
    database,
    `users/${authState.activeUser.uid}/bookmarks/${bookmark.id}`
  );
  const bookmarkLikesRef = ref(
    database,
    `bookmarks/${bookmark.id}/likes/${authState.activeUser.uid}`
  );

  try {
    await set(userFavoritesRef, {
      ...bookmark,
      likes: { [authState.activeUser.uid]: true },
    });

    if (bookmark.userId === authState.activeUser.uid) {
      await set(userBookmarksRef, {
        ...bookmark,
        likes: { [authState.activeUser.uid]: true },
      });
    }

    await set(bookmarkLikesRef, true);

    setIsUpdatingFavorites(false);

    toast(
      <Alert
        title={"Tada!"}
        description={"Yer işareti favorileriniz arasında yerini aldı."}
      />
    );
  } catch (error) {
    setIsUpdatingFavorites(false);

    console.log(error);

    toast(
      <Alert
        title={"Oops!"}
        description={`Yer işareti favorilere eklenirken bir hata oluştu. ${error.message}`}
      />
    );
  }
};
