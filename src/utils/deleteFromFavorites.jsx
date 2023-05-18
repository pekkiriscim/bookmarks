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

  const favoritesRef = ref(
    database,
    `favorites/${authState.activeUser.uid}/${bookmark.id}`
  );
  const likesRef = ref(
    database,
    `bookmarks/${bookmark.id}/likes/${authState.activeUser.uid}`
  );

  try {
    await set(favoritesRef, null);
    await set(likesRef, false);

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
