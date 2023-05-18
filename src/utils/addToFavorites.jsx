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

  const favoritesRef = ref(
    database,
    `favorites/${authState.activeUser.uid}/${bookmark.id}`
  );
  const likesRef = ref(
    database,
    `bookmarks/${bookmark.id}/likes/${authState.activeUser.uid}`
  );

  // eslint-disable-next-line no-unused-vars
  const { likes, ...bookmarkWithoutLikes } = bookmark;

  try {
    await set(favoritesRef, bookmarkWithoutLikes);
    await set(likesRef, true);

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
