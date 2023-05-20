import { useState, useEffect, useContext } from "react";

import BookmarkCard from "../components/BookmarkCard";
import EmptyState from "../components/EmptyState";

import { LoadingIcon } from "../components/Icons";

import { AuthStateContext } from "../components/Dashboard";

import { database } from "../firebase";
import { ref, onValue, off } from "firebase/database";

function Bookmarks() {
  const [isBookmarksLoading, setIsBookmarksLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState();

  const { authState } = useContext(AuthStateContext);

  useEffect(() => {
    const userBookmarksRef = ref(
      database,
      `users/${authState.activeUser.uid}/bookmarks`
    );

    onValue(userBookmarksRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data !== null) {
        const bookmarkArray = [];

        Object.values(data).map((bookmark) => {
          bookmark.id && bookmarkArray.push(bookmark);
        });

        if (bookmarkArray.length === 0) {
          setBookmarks(false);

          setIsBookmarksLoading(false);
        } else {
          bookmarkArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

          setBookmarks(bookmarkArray);

          setIsBookmarksLoading(false);
        }
      } else {
        setBookmarks(false);

        setIsBookmarksLoading(false);
      }
    });

    return () => {
      off(userBookmarksRef);
    };
  }, [authState.activeUser.uid]);

  return (
    <div className="grid gap-x-4 gap-y-4">
      {isBookmarksLoading ? (
        <div className="m-auto">
          <LoadingIcon />
        </div>
      ) : bookmarks === false ? (
        <EmptyState
          title={"Nereye Gittiniz?"}
          description={
            "Burada hiçbir şey yok gibi görünüyor! Yer işaretlerinizi ekleyin ve bu bölümde keyifle dolaşın."
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

export default Bookmarks;
