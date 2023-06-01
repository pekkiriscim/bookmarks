import { useState, useEffect } from "react";

import { database_request_limit } from "../bookmarks.config";

import BookmarkCard from "../components/BookmarkCard";
import EmptyState from "../components/EmptyState";

import { LoadingIcon } from "../components/Icons";

import { database } from "../firebase";
import { ref, onValue, off, query, limitToLast } from "firebase/database";

function Explore() {
  const [isExploreLoading, setIsExploreLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState();

  useEffect(() => {
    const bookmarksRef = query(
      ref(database, "bookmarks"),
      limitToLast(database_request_limit)
    );

    onValue(bookmarksRef, (snapshot) => {
      const data = snapshot.val();

      if (data && data !== null) {
        const bookmarkArray = [];

        Object.values(data).map((bookmark) => {
          console.log(bookmark);
          if (!bookmark.private || bookmark.private == false) {
            bookmark.id && bookmarkArray.push(bookmark);
          }
        });

        if (bookmarkArray.length === 0) {
          setBookmarks(false);

          setIsExploreLoading(false);
        } else {
          bookmarkArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

          setBookmarks(bookmarkArray);

          setIsExploreLoading(false);
        }
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
          title={"Boş bir keşif alanı"}
          description={
            "Şu anda keşfedilecek bir şey bulunmuyor. Yakında burası seni büyüleyecek şekilde dolacak!"
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

export default Explore;
