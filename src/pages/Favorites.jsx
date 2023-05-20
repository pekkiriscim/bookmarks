import { useState, useEffect, useContext } from "react";

import BookmarkCard from "../components/BookmarkCard";
import EmptyState from "../components/EmptyState";

import { LoadingIcon } from "../components/Icons";

import { AuthStateContext } from "../components/Dashboard";

import { database } from "../firebase";
import { ref, onValue, off } from "firebase/database";

function Favorites() {
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState();

  const { authState } = useContext(AuthStateContext);

  useEffect(() => {
    const userFavoritesRef = ref(
      database,
      `users/${authState.activeUser.uid}/favorites`
    );

    onValue(userFavoritesRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data !== null) {
        const bookmarkArray = Object.values(data);
        bookmarkArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        setBookmarks(bookmarkArray);

        setIsFavoritesLoading(false);
      } else {
        setBookmarks(false);

        setIsFavoritesLoading(false);
      }
    });

    return () => {
      off(userFavoritesRef);
    };
  }, [authState.activeUser.uid]);

  return (
    <div className="grid gap-x-4 gap-y-4">
      {isFavoritesLoading ? (
        <div className="m-auto">
          <LoadingIcon />
        </div>
      ) : bookmarks === false ? (
        <EmptyState
          title={"Favori Partisi Başlamamış!"}
          description={
            "Favori listenizi renklendirmek için bir tane ekleyin ve partiye katılın!"
          }
        />
      ) : (
        bookmarks.map((bookmark) => {
          if (bookmark.id) {
            return <BookmarkCard key={bookmark.id} bookmark={bookmark} />;
          }
        })
      )}
    </div>
  );
}

export default Favorites;
