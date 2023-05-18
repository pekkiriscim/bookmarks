import { useState, useEffect } from "react";

import BookmarkCard from "../components/BookmarkCard";
import EmptyState from "../components/EmptyState";

import { LoadingIcon } from "../components/Icons";

import { database } from "../firebase";
import { ref, onValue, off } from "firebase/database";

function Explore() {
  const [isExploreLoading, setIsExploreLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState();

  useEffect(() => {
    const bookmarksRef = ref(database, "bookmarks");

    onValue(bookmarksRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data !== null) {
        const bookmarkArray = Object.values(data);
        bookmarkArray.sort((a, b) => b.timestamp - a.timestamp);

        setBookmarks(bookmarkArray);

        setIsExploreLoading(false);
      } else {
        setBookmarks(false);

        setIsExploreLoading(false);
      }
    });

    return () => {
      off(bookmarksRef);
    };
  }, []);

  return (
    <div className="grid gap-x-4 gap-y-4">
      {isExploreLoading ? (
        <div className="m-auto">
          <LoadingIcon />
        </div>
      ) : bookmarks === false ? (
        <EmptyState
          title={"Burası şu anda bomboş"}
          description={
            "Şu anda keşfedilecek bir şey bulunmuyor. Yakında burası seni büyüleyecek şekilde dolacak!"
          }
        />
      ) : (
        bookmarks.map((bookmark) => {
          return <BookmarkCard key={bookmark.id} bookmark={bookmark} />;
        })
      )}
    </div>
  );
}

export default Explore;
